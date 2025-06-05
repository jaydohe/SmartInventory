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
                       opt => opt.MapFrom(src => src.ForecastValue))
            .ForMember(dest => dest.Method,
                        opt => opt.MapFrom(src => src.Method))
            .ForMember(dest => dest.Trend,
                       opt => opt.MapFrom(src => src.Trend))
            .ForMember(dest => dest.Seasonal,
                       opt => opt.MapFrom(src => src.Seasonal))
            .ForMember(dest => dest.SeasonalityPeriod,
                       opt => opt.MapFrom(src => src.SeasonalityPeriod))
            .ForMember(dest => dest.LowerBound,
                       opt => opt.MapFrom(src => src.LowerBound))
            .ForMember(dest => dest.UpperBound,
                       opt => opt.MapFrom(src => src.UpperBound))
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
                       opt => opt.MapFrom(src => src.EOQ))
            .ForMember(dest => dest.SafetyStock,
                        opt => opt.MapFrom(src => src.SafetyStock))
            .ForMember(dest => dest.OptimalInventory,
                        opt => opt.MapFrom(src => src.OptimalInventory))
            .ForMember(dest => dest.CreatedAt,
                        opt => opt.MapFrom(src => src.CreatedAt));
    }
}