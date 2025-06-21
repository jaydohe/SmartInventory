using CTCore.DynamicQuery.Core.Domain.Interfaces;
using MathNet.Numerics.Statistics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;
using SI.Domain.Entities;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;
using System.Globalization;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SI.Infrastructure.Integrations.CronJob
{
    public static class TimeSeriesUtils
    {
        public static List<double> BuildContinuousHistory(
            List<(int Year, int Month, double Quantity)> raw
        )
        {
            if (!raw.Any()) return new List<double>();

            var startDate = new DateTime(raw.Min(x => x.Year), raw.Min(x => x.Month), 1);
            var endDate = new DateTime(raw.Max(x => x.Year), raw.Max(x => x.Month), 1);

            var continuous = new List<DateTime>();
            for (var dt = startDate; dt <= endDate; dt = dt.AddMonths(1))
                continuous.Add(dt);

            var dict = raw.ToDictionary(
                x => new DateTime(x.Year, x.Month, 1),
                x => x.Quantity);

            return continuous
                .Select(dt => dict.TryGetValue(dt, out var qty) ? qty : 0.0)
                .ToList();
        }

        public static double Percentile(this List<double> sequence, double p)
        {
            if (!sequence.Any()) return 0;
            var sorted = sequence.OrderBy(x => x).ToArray();
            var idx = (int)Math.Ceiling((sorted.Length * p) / 100) - 1;
            idx = Math.Max(0, Math.Min(sorted.Length - 1, idx));
            return sorted[idx];
        }
    }

    public class HoltWintersResult
    {
        public double[] Level { get; init; }
        public double[] Trend { get; init; }
        public double[] Seasonal { get; init; }
        public List<double> Residuals { get; init; }
    }

    public static class HoltWintersModel
    {
        public static HoltWintersResult Fit(
            List<double> history,
            double alpha,
            double beta,
            double gamma,
            int m
        )
        {
            int T = history.Count;
            var level = new double[T];
            var trend = new double[T];
            var seasonal = new double[m];
            var residuals = new List<double>(T - 1);

            // Initialize level & trend
            level[0] = history.Take(m).Average();
            trend[0] = (history.Skip(m).Take(m).Average() - level[0]) / m;

            // Initialize seasonal averages over K cycles
            int K = T / m;
            for (int j = 0; j < m; j++)
            {
                double sum = 0;
                for (int k = 0; k < K; k++)
                {
                    var periodAvg = history.Skip(k * m).Take(m).Average();
                    sum += history[j + k * m] - periodAvg;
                }
                seasonal[j] = sum / K;
            }

            // Iterations
            for (int t = 1; t < T; t++)
            {
                var lastL = level[t - 1];
                var lastT = trend[t - 1];
                var lastS = seasonal[t % m];

                level[t] = alpha * (history[t] - lastS) + (1 - alpha) * (lastL + lastT);
                trend[t] = beta * (level[t] - lastL) + (1 - beta) * lastT;
                seasonal[t % m] = gamma * (history[t] - level[t]) + (1 - gamma) * lastS;

                // 1-step residual
                double oneStep = lastL + lastT + seasonal[t % m];
                residuals.Add(history[t] - oneStep);
            }

            return new HoltWintersResult
            {
                Level = level,
                Trend = trend,
                Seasonal = seasonal,
                Residuals = residuals
            };
        }

        public static (double Forecast, double Lower, double Upper) Forecast(
            HoltWintersResult hw,
            int h,
            double stdRes,
            double minLimit,
            double maxLimit
        )
        {
            int m = hw.Seasonal.Length;
            int T = hw.Level.Length;
            double s = hw.Seasonal[(T - 1 + h) % m];
            double baseFc = hw.Level[T - 1] + h * hw.Trend[T - 1] + s;

            // Constraint
            double fc = Math.Max(minLimit, Math.Min(baseFc, maxLimit));

            double lower = Math.Max(minLimit, fc - 1.96 * stdRes);
            double upper = fc + 1.96 * stdRes;
            return (fc, lower, upper);
        }
    }

    public class HoltWintersJob : IJob
    {
        private readonly IRepository<OrderDetail> _orderDetailRepo;
        private readonly IRepository<Forecast> _fcRepo;
        private readonly IUnitOfWork _uow;
        private readonly ILogger<HoltWintersJob> _logger;

        public HoltWintersJob(
            IRepository<OrderDetail> orderDetailRepository,
            IRepository<Forecast> forecastRepository,
            IUnitOfWork unitOfWork,
            ILogger<HoltWintersJob> logger
        )
        {
            _orderDetailRepo = orderDetailRepository;
            _fcRepo = forecastRepository;
            _uow = unitOfWork;
            _logger = logger;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var now = DateTimeOffset.UtcNow;

            // Xóa forecast cũ
            var toClean = new[]
            {
                now.AddMonths(1).ToString("yyyy-MM", CultureInfo.InvariantCulture),
                now.AddMonths(2).ToString("yyyy-MM", CultureInfo.InvariantCulture),
                now.AddMonths(3).ToString("yyyy-MM", CultureInfo.InvariantCulture)
            };
            var old = await _fcRepo.BuildQuery
                .Where(x => x.Method == "HW-Additive" && toClean.Contains(x.Period))
                .ToListAsync();
            old.ForEach(r => _fcRepo.Remove(r));
            await _uow.SaveChangeAsync();

            // Lấy danh sách product+warehouse
            var combos = await _orderDetailRepo.BuildQuery
                .Include(x => x.Order)
                .Where(x => x.Order.OrderStatus == OrderStatus.DELIVERED)
                .GroupBy(x => new { x.ProductId, x.Order.WarehouseId })
                .Select(g => new { g.Key.ProductId, g.Key.WarehouseId })
                .ToListAsync();

            foreach (var item in combos)
            {
                // Raw history: lấy Year/Month/Quantity
                var rawAnon = await _orderDetailRepo.BuildQuery
                    .Include(x => x.Order)
                    .Where(x => x.ProductId == item.ProductId && x.Order.WarehouseId == item.WarehouseId)
                    .GroupBy(o => new { Year = o.Order.CreatedAt.Year, Month = o.Order.CreatedAt.Month })
                    .Select(g => new { g.Key.Year, g.Key.Month, Quantity = g.Sum(x => x.Quantity) })
                    .ToListAsync();

                // Chuyển sang List<(int, int, double)>
                var raw = rawAnon
                    .Select(x => (x.Year, x.Month, (double)x.Quantity))
                    .ToList();

                var history = TimeSeriesUtils.BuildContinuousHistory(raw);
                if (history.Count < 6)
                {
                    _logger.LogWarning("Data too short for HW: {Product}", item.ProductId);
                    continue;
                }

                double alpha = 0.3, beta = 0.05, gamma = 0.1;
                int m = Math.Min(12, history.Count / 2);
                var hw = HoltWintersModel.Fit(history, alpha, beta, gamma, m);
                double stdRes = Statistics.StandardDeviation(hw.Residuals);

                double maxHist = history.Max() * 3;
                double minHist = 0;

                for (int h = 1; h <= 3; h++)
                {
                    var (fc, lower, upper) = HoltWintersModel.Forecast(hw, h, stdRes, minHist, maxHist);
                    _fcRepo.Add(new Forecast
                    {
                        ProductId = item.ProductId,
                        WarehouseId = item.WarehouseId,
                        Method = "HW-Additive",
                        Period = now.AddMonths(h).ToString("yyyy-MM", CultureInfo.InvariantCulture),
                        ForecastValue = Math.Round(fc),
                        Level = hw.Level.Last(),
                        Trend = hw.Trend.Last(),
                        Seasonal = hw.Seasonal[(history.Count - 1 + h) % m],
                        LowerBound = lower,
                        UpperBound = upper,
                        ModelParameters = $"{{\"alpha\":{alpha},\"beta\":{beta},\"gamma\":{gamma},\"m\":{m}}}",
                        SeasonalityPeriod = m,
                        CreatedAt = DateTimeOffset.UtcNow
                    });
                }

                await _uow.SaveChangeAsync();
            }
        }
    }
}
