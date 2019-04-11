using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Model;
using System;
using System.Collections.Generic;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapterController : ControllerBase
    {

        private readonly ChapterService _chapterService;
        public ChapterController(ChapterService chapterService)
        {
            _chapterService = chapterService;
        }

        [HttpGet("GetChaptersByMangaId/{mangaId}")]
        public ActionResult<List<ChapterModel>> GetChaptersByMangaId(Guid mangaId)
        {
            var result = Mapper.Map<List<ChapterModel>>(_chapterService.GetChaptersByMangaId(mangaId));
            return Ok(result);
        }

        [HttpGet("GetNextChapter/{mangaId}/{currentChapterNumber}")]
        public ActionResult<ChapterModel> GetNextChapter(Guid mangaId, int currentChapterNumber)
        {
            var result = Mapper.Map<ChapterModel>(_chapterService.GetNextChapter(mangaId, currentChapterNumber));
            return Ok(result);
        }

        [HttpGet("GetPreviousChapter/{mangaId}/{currentChapterNumber}")]
        public ActionResult<ChapterModel> GetPreviousChapter(Guid mangaId, int currentChapterNumber)
        {
            var result = Mapper.Map<ChapterModel>(_chapterService.GetPreviousChapter(mangaId, currentChapterNumber));
            return Ok(result);
        }
    }
}
