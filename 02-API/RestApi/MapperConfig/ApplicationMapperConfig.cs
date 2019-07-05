using Api.Model;
using Application.Entities;
using Application.Model;
using Microsoft.Extensions.Configuration;
using RestAPI.Model;
using AM = AutoMapper;

namespace RestAPI.MapperConfig
{
    public class ApplicationMapperConfig
    {
        readonly IConfiguration _config;
        public ApplicationMapperConfig(IConfiguration config)
        {
            _config = config;
        }

        public void Initialize()
        {
            var baseUrl = _config["ApiSettings:BaseUrl"];
            AM.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<MangaDetails, MangaDetailsModel>()
                .ForMember(d => d.Cover, c => c.MapFrom(s => s.Cover.Contains("http") ? s.Cover : baseUrl + s.Cover));
                cfg.CreateMap<Chapter, ChapterModel>();
                cfg.CreateMap<Page, PageModel>()
                .ForMember(d => d.Url, c => c.MapFrom(s => s.InternalUrl.Contains("http") ? s.InternalUrl : baseUrl + s.InternalUrl));

            });
        }
    }
}
