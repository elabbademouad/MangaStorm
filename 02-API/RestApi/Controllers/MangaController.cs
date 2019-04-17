using Api.Model;
using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MangaController : ControllerBase
    {
        private readonly MangaService _mangaService;
        public MangaController(MangaService mangaService)
        {
            _mangaService = mangaService;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetAll()
        {
            var result = Mapper.Map<List<MangaDetailsModel>>(_mangaService.GetMangaDetailsList());
            return Ok(result);
        }

        [HttpGet("GetById/{mangaId}")]
        public ActionResult<MangaDetailsModel> GetById(string mangaId)
        {
            var mangGuid = Guid.Parse(mangaId);
            var result = Mapper.Map<MangaDetailsModel>(_mangaService.GetMangaDetailsById(mangGuid));
            return Ok(result);
        }

        [HttpGet("GetNewList/{count}")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetNewList(int count)
        {
            var result = Mapper.Map<List<MangaDetailsModel>>(_mangaService.GetNewList(count));
            return Ok(result);
        }

        [HttpGet("GetForYouList")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetForYouList(int count, List<string> tags)
        {
            var result = Mapper.Map<List<MangaDetailsModel>>(_mangaService.GetMangaForYou(count, tags));
            return Ok(result);
        }

        [HttpGet("GetMangaListHasNewChapter/{count}")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GetMangaListHasNewChapter(int count)
        {
            var result = Mapper.Map<List<MangaDetailsModel>>(_mangaService.GetMangaListHasNewChapter(count));
            return Ok(result);
        }

        [HttpGet("GetMostViewed/{count}")]
        public ActionResult<IEnumerable<MangaDetailsModel>> GeMostViewedList(int count)
        {
            var result = Mapper.Map<List<MangaDetailsModel>>(_mangaService.GetMostViewed(count));
            return Ok(result);
        }

    }
}
