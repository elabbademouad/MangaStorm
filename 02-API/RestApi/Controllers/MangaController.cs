using Api.Model;
using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using RestAPI.Constants;
using RestAPI.Enums;
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
        public MangaController(Func<PluginEnum, IMangaService> mangaServiceDelegate, IMemoryCache cache)
        {
            _mangaServiceDelegate = mangaServiceDelegate;
            _cache = cache;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetAll([FromHeader]PluginEnum source = PluginEnum.OnManga, int page = 1)
        {
            List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.GETALLMANGA, source, page), (cacheEntry) =>
               {
                   var mangaService = _mangaServiceDelegate(source);
                   return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMangaDetailsList(page));
               });
            return Ok(result);
        }

        [HttpGet("GetById")]
        public ActionResult<MangaDetailsModel> GetById(string mangaId, [FromHeader]PluginEnum source = PluginEnum.OnManga)
        {
            var result = _cache.GetOrCreate(string.Format(CacheKeys.MANGA, mangaId), (c) =>
             {
                 var mangaService = _mangaServiceDelegate(source);
                 return Mapper.Map<MangaDetailsModel>(mangaService.GetMangaDetailsById(mangaId));
             });
            return Ok(result);
        }

        [HttpGet("GetNewList")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetNewList(int count, [FromHeader]PluginEnum source = PluginEnum.OnManga)
        {
            var mangaService = _mangaServiceDelegate(source);
            var result = Mapper.Map<List<MangaDetailsModel>>(mangaService.GetNewList(count));
            return Ok(result);
        }

        [HttpGet("GetForYouList")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetForYouList(int count, List<string> tags, [FromHeader]PluginEnum source = PluginEnum.OnManga)
        {
            List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.FORYOU, source), (c) =>
            {
                var mangaService = _mangaServiceDelegate(source);
                return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMangaForYou(count, tags));
            });
            return Ok(result);
        }

        [HttpGet("GetMangaListHasNewChapter")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetMangaListHasNewChapter(int count, [FromHeader]PluginEnum source = PluginEnum.OnManga)
        {
            List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.NEWCHAPTERS, source), (c) =>
            {
                var mangaService = _mangaServiceDelegate(source);
                return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMangaListHasNewChapter(count));
            });
            return Ok(result);
        }

        [HttpGet("GetMostViewed")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GeMostViewedList(int count, [FromHeader]PluginEnum source = PluginEnum.OnManga)
        {
            List<MangaDetailsModel> result = _cache.GetOrCreate(string.Format(CacheKeys.MOSTVIEWS, source), (c) =>
            {
                var mangaService = _mangaServiceDelegate(source);
                return Mapper.Map<List<MangaDetailsModel>>(mangaService.GetMostViewed(count));
            });
            return Ok(result);

        }

    }
}
