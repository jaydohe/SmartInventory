using AutoMapper;
using SI.Contract.UserContract;
using SI.Contract.WarehouseContract;
using SI.Domain.Entities;

namespace SI.Infrastructure.Common.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDTO>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));

        CreateMap<Warehouse, GetWarehouseResult>();
    }
}