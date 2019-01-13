using Api.Model;
using Application.Entities;
using AM = AutoMapper;
using System.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Application.DataModel;

namespace RestAPI.Mapper
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
                cfg.CreateMap<MangaDetails, MangaIDetailsModel>()
                .ForMember(d => d.Cover, c => c.MapFrom(s => baseUrl + s.Cover));
            });
        }
    }
}
