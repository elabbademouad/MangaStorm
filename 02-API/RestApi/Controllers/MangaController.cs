using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Model;
using System.Configuration;
using Application.Interfaces;
using Application.Services;
using Application.Entities;
using AutoMapper;

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
    }
}
