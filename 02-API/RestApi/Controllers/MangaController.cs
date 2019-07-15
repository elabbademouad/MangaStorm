using Api.Model;
using Application.Entities;
using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using RestAPI.Constants;
using RestAPI.Enums;
using RestAPI.Model;
using System;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MangaController : ControllerBase
    {
        private readonly Func<PluginEnum, IMangaService> _mangaServiceDelegate;
        private readonly IMemoryCache _cache;
        readonly IConfiguration _config;
        public MangaController(Func<PluginEnum, IMangaService> mangaServiceDelegate, IMemoryCache cache, IConfiguration config)
        {
            _mangaServiceDelegate = mangaServiceDelegate;
            _cache = cache;
            _config = config;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetAll(PluginEnum source = PluginEnum.OnManga, int page = 1, string tag = "")
        {
            try
            {
                List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.GETALLMANGA, source, page, tag), (cacheEntry) =>
                {
                    var mangaService = _mangaServiceDelegate(source);
                    return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMangaDetailsList(page, tag: tag));
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetById")]
        public ActionResult<MangaDetailsModel> GetById(string mangaId, PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                var result = _cache.GetOrCreate(string.Format(CacheKeys.MANGA, mangaId), (c) =>
                {
                    var mangaService = _mangaServiceDelegate(source);
                    return Mapper.Map<MangaDetailsModel>(mangaService.GetMangaDetailsById(mangaId));
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetNewList")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetNewList(int count, PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                var mangaService = _mangaServiceDelegate(source);
                var result = Mapper.Map<List<MangaDetailsModel>>(mangaService.GetNewList(count));
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetForYouList")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetForYouList(int count, List<string> tags, PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.FORYOU, source), (c) =>
                {
                    var mangaService = _mangaServiceDelegate(source);
                    return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMangaForYou(count, tags));
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetMangaListHasNewChapter")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetMangaListHasNewChapter(int count, PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.NEWCHAPTERS, source), (c) =>
                {
                    var mangaService = _mangaServiceDelegate(source);
                    return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMangaListHasNewChapter(count));
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetMostViewed")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GeMostViewedList(int count, PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.MOSTVIEWS, source), (c) =>
                {
                    var mangaService = _mangaServiceDelegate(source);
                    return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMostViewed(count));
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("GetSources")]
        public ActionResult<IEnumerable<SourceModel>> GetSources()
        {
            try
            {
                List<SourceModel> result = _cache.GetOrCreate(string.Format(CacheKeys.MANGASOURCES), (c) =>
                {
                    result = new List<SourceModel>()
                {
                    new SourceModel()
                    {
                        Logo= _config["ApiSettings:BaseUrl"]+"mangastorm.png",
                        Rating=4,
                        Source=new Source()
                        {
                            Id=0,
                            Label="mangaStorm",
                        },
                        Language="عربية"
                    },
                    new SourceModel()
                    {
                        Logo= _config["ApiSettings:BaseUrl"]+"on-manga.PNG",
                        Rating=3,
                        Source=new Source()
                        {
                            Id=1,
                            Label="on-manga.ae",
                        },
                        Language="عربية"
                    }
                };
                    return result;
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
