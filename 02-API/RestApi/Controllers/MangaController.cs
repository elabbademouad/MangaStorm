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

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MangaController : ControllerBase
    {
        public MangaController(MangaService mangaService)
        {
        }
        [HttpGet("GetMangaItems")]
        public ActionResult<IEnumerable<MangaItemModel>> GetMangaItems()
        {
            return Ok(null);
        }

        [HttpGet("GetTags")]
        public ActionResult<IEnumerable<string>> GetTags()
        {
            return Ok(null);
        }

        [HttpGet("GetChaptersByMatricule/{matricule}")]
        public ActionResult<IEnumerable<Chapter>> GetChaptersById(string matricule)
        {
            return Ok(null);
        }
        [HttpGet("GetPagesById/{chapterId}")]
        public ActionResult<IEnumerable<Page>> GetPagesById(int chapterId)
        {
            return null;
        }
    }
}
