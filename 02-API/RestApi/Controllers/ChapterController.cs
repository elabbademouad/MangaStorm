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

        private ChapterService _chapterService;
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
    }
}
