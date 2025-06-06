using AutoMapper;
using SI.Contract.InventoryContract;
using SI.Contract.SmartContract;
using SI.Contract.UserContract;
using SI.Domain.Entities;

namespace SI.Infrastructure.Common.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDTO>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));

        CreateMap<Inventory, InventoryDTO>()
            .ForMember(dest => dest.ProductId,
                       opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.ProductName,
                       opt => opt.MapFrom(src => src.Product!.Name))
            .ForMember(dest => dest.ProductUnit,
                       opt => opt.MapFrom(src => src.Product!.Unit))
            .ForMember(dest => dest.WarehouseId,
                       opt => opt.MapFrom(src => src.WarehouseId))
            .ForMember(dest => dest.WarehouseName,
                       opt => opt.MapFrom(src => src.Warehouse!.Name))
            .ForMember(dest => dest.Quantity,
                       opt => opt.MapFrom(src => src.Quantity))
            .ForMember(dest => dest.CreatedAt,
                       opt => opt.MapFrom(src => src.CreatedAt));

        CreateMap<Forecast, AllDemandForecastResponse>()
            .ForMember(dest => dest.ProductId,
                        opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.ProductName,
                       opt => opt.MapFrom(src => src.Product!.Name))
            .ForMember(dest => dest.ProductUnit,
                       opt => opt.MapFrom(src => src.Product!.Unit))
            .ForMember(dest => dest.WarehouseId,
                       opt => opt.MapFrom(src => src.WarehouseId))
            .ForMember(dest => dest.WarehouseName,
                       opt => opt.MapFrom(src => src.Warehouse!.Name))
            .ForMember(dest => dest.Period,
                       opt => opt.MapFrom(src => src.Period))
            .ForMember(dest => dest.ForecastValue,
                       opt => opt.MapFrom(src => Math.Round(src.ForecastValue ?? 0, 0)))
            .ForMember(dest => dest.Method,
                        opt => opt.MapFrom(src => src.Method))
            .ForMember(dest => dest.Trend,
                       opt => opt.MapFrom(src => Math.Round(src.Trend ?? 0, 2)))
            .ForMember(dest => dest.Seasonal,
                       opt => opt.MapFrom(src => Math.Round(src.Seasonal ?? 0, 2)))
            .ForMember(dest => dest.SeasonalityPeriod,
                       opt => opt.MapFrom(src => src.SeasonalityPeriod))
            .ForMember(dest => dest.LowerBound,
                       opt => opt.MapFrom(src => Math.Round(src.LowerBound ?? 0, 0)))
            .ForMember(dest => dest.UpperBound,
                       opt => opt.MapFrom(src => Math.Round(src.UpperBound ?? 0, 0)))
            .ForMember(dest => dest.CreatedAt,
                       opt => opt.MapFrom(src => src.CreatedAt));

        CreateMap<Forecast, InventoryOptimizationResponse>()
            .ForMember(dest => dest.ProductId,
                       opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.ProductName,
                       opt => opt.MapFrom(src => src.Product!.Name))
            .ForMember(dest => dest.ProductUnit,
                       opt => opt.MapFrom(src => src.Product!.Unit))
            .ForMember(dest => dest.WarehouseId,
                       opt => opt.MapFrom(src => src.WarehouseId))
            .ForMember(dest => dest.WarehouseName,
                       opt => opt.MapFrom(src => src.Warehouse!.Name))
            .ForMember(dest => dest.Method,
                       opt => opt.MapFrom(src => src.Method))
            .ForMember(dest => dest.EOQ,
                       opt => opt.MapFrom(src => Math.Round(src.EOQ ?? 0, 0)))
            .ForMember(dest => dest.SafetyStock,
                        opt => opt.MapFrom(src => Math.Round(src.SafetyStock ?? 0, 0)))
            .ForMember(dest => dest.OptimalInventory,
                        opt => opt.MapFrom(src => Math.Round(src.OptimalInventory ?? 0, 0)))
            .ForMember(dest => dest.CreatedAt,
                        opt => opt.MapFrom(src => src.CreatedAt));
    }
}