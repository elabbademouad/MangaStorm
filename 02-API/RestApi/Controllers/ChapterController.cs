using Application.Model;
using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using RestAPI.Constants;
using RestAPI.Enums;
using RestAPI.Model;
using System;
using System.Collections.Generic;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapterController : ControllerBase
    {

        private readonly Func<PluginEnum, IChapterService> _chapterServiceDelegate;
        private readonly IMemoryCache _cache;

        public ChapterController(Func<PluginEnum, IChapterService> chapterServiceDelegate, IMemoryCache cache)
        {
            _chapterServiceDelegate = chapterServiceDelegate;
            _cache = cache;
        }

        [HttpGet("GetChaptersByMangaId")]
        public ActionResult<List<ChapterModel>> GetChaptersByMangaId(string mangaId, PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                var result = _cache.GetOrCreate(string.Format(CacheKeys.CHAPTERS, mangaId), (c) =>
                {
                    var chapterService = _chapterServiceDelegate(source);
                    return Mapper.Map<List<ChapterModel>>(chapterService.GetChaptersByMangaId(mangaId));
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("GetNextChapter")]
        public ActionResult<ChapterModel> GetNextChapter(string mangaId, object currentChapter, PluginEnum source = PluginEnum.Default)
        {
            try
            {
                var chapterService = _chapterServiceDelegate(PluginEnum.OnManga);
                var result = Mapper.Map<ChapterModel>(chapterService.GetNextChapter(mangaId, currentChapter));
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetPreviousChapter")]
        public ActionResult<ChapterModel> GetPreviousChapter(string mangaId, object currentChapter, PluginEnum source = PluginEnum.Default)
        {
            try
            {
                var chapterService = _chapterServiceDelegate(PluginEnum.OnManga);
                var result = Mapper.Map<ChapterModel>(chapterService.GetPreviousChapter(mangaId, currentChapter));
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
