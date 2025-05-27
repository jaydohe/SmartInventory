using AutoMapper;
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

        CreateMap<Forecast, InventoryOptimizationResponse>()
            .ForMember(dest => dest.EOQ,
                        opt => opt.MapFrom(src => src.EOQ ?? 0))
            .ForMember(dest => dest.SafetyStock,
                        opt => opt.MapFrom(src => src.SafetyStock ?? 0))
            .ForMember(dest => dest.OptimalInventory,
                        opt => opt.MapFrom(src => src.OptimalInventory ?? 0))
            .ForMember(dest => dest.ProductId,
                        opt => opt.MapFrom(src => src.ProductId ?? string.Empty))
            .ForMember(dest => dest.ProductName,
                       opt => opt.MapFrom(src => src.Product!.Name ?? string.Empty))
            .ForMember(dest => dest.ProductUnit,
                       opt => opt.MapFrom(src => src.Product!.Unit ?? string.Empty))
            .ForMember(dest => dest.WarehouseId,
                       opt => opt.MapFrom(src => src.WarehouseId))
            .ForMember(dest => dest.WarehouseName,
                       opt => opt.MapFrom(src => src.Warehouse!.Name ?? string.Empty))
            .ForMember(dest => dest.Method,
                        opt => opt.MapFrom(src => src.Method))
            .ForMember(dest => dest.CreatedAt,
                        opt => opt.MapFrom(src => src.CreatedAt));
    }
}