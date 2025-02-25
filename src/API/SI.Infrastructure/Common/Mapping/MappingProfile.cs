using AutoMapper;
using SI.Domain.Entities;

namespace SI.Infrastructure.Core.Mapping;
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        //CreateMap<User, UserDTO>()
        //    .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role.ToString()));
        
        //CreateMap<CustomHeaderExcel, GetAllCusHeaderExcelDTO>();
    }
}