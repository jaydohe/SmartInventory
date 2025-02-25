using CTCore.DynamicQuery.Core.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;
using SI.Domain.Enums;

namespace SI.Infrastructure.Integrations.CronJob;

public class CheckExpireAtJob
    (
        //IRepository<Ticket> ticketRepos,
        //IRepository<Scheme> schemeRepos,
        IUnitOfWork unitOfWork,
        ILogger<CheckExpireAtJob> logger
    ) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        //    var dateNow = DateTimeOffset.UtcNow;
        //    // ticket
        //    var tickets = ticketRepos.BuildQuery
        //                        .Include(x => x.Processes!)
        //                        .ThenInclude(x => x.UserReceived)
        //                        .Where(x => x.Status == TicketStatus.RECEVIED);
        //    foreach (var ticket in tickets)
        //    {
        //        var processes = ticket.Processes?
        //                    .Where(x => x.State == TicketStates.PROCESSING)
        //                    .Where(x => x.ExpireAt != null);
        //        foreach (var process in processes!)
        //        {
        //            var timeRemainTicket = Math.Floor((process.ExpireAt!.Value - dateNow).TotalDays);
        //            if (timeRemainTicket == 1 || timeRemainTicket == 3 || timeRemainTicket == 7)
        //            {
        //                process.SendNotifSenderExpireAtTicket("null", timeRemainTicket, process.UserSenderId);
        //                process.SendNotifReceivedExpireAtTicket("null", timeRemainTicket, process.UserReceivedId);
        //            }
        //            else if (timeRemainTicket == -1)
        //            {
        //                process.SendNotifSenderExpireAtTicket("null", process.UserSenderId);
        //                process.SendNotifReceivedExpireAtTicket("null", process.UserReceivedId);
        //            }
        //        }
        //    }

        //    //Scheme
        //    var schemes = schemeRepos.BuildQuery
        //                        .Include(x => x.Processes!)
        //                        .ThenInclude(x => x.User)
        //                        .Where(x => x.Status == SchemeStatus.PROCESSING)
        //                        .Where(x => x.ExpireAt != null);
        //    foreach (var scheme in schemes)
        //    {
        //        var listUser = scheme.Processes?
        //                        .Where(x => x.CompletedPercent < 100)
        //                        .Select(x => x.UserId).ToArray();
        //        var timeRemainScheme = Math.Floor((scheme.ExpireAt!.Value - dateNow).TotalDays);
        //        if (timeRemainScheme == 1 || timeRemainScheme == 3 || timeRemainScheme == 7)
        //        {
        //            scheme.SendNotifSenderExpireAtScheme("null", timeRemainScheme, scheme.UserId);
        //            scheme.SendNotifReceivedExpireAtScheme("null", timeRemainScheme, listUser!);
        //        }
        //        else if (timeRemainScheme == -1)
        //        {
        //            scheme.SendNotifSenderExpireAtScheme("null", scheme.UserId);
        //            scheme.SendNotifReceivedExpireAtScheme("null", listUser!);
        //        }
        //    }

        //    var ret = await unitOfWork.SaveChangeAsync();
        //    if (ret < 0)
        //    {
        //        logger.LogWarning($"Failure to saving.");
        //        return;
        //    }
    }
}
