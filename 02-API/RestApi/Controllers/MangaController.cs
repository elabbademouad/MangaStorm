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
    }
}
