using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DataAccess.DataContext;
using DataAccess.Entity;
using Microsoft.EntityFrameworkCore;
using Api.Model;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MangaController : ControllerBase
    {
        // GET api/values
        [HttpGet("GetMangaItems")]
        public ActionResult<IEnumerable<MangaItemModel>> GetMangaItems()
        {
            string rootPath = "http://localhost:5000/";
            string connectionString = "Data Source="+rootPath+"Manga/ManagDb.db";
            using (var db =new MangaDataContext(connectionString))
            {
                var mangaList=db.Mangas.Include(m=>m.Chapter)
                        .Select(m=>new MangaItemModel() {
                            Id=m.Id,
                            ChapterCount=m.Chapter.Count.ToString(),
                            Cover= rootPath+ m.CoverInternalUrl,
                            Date=m.Date,
                            Name=m.Name,
                            Resume=m.Resume,
                            State=m.State,
                            Tags=m.Tags
                        }).ToList();
                return mangaList;
            }
        }
    }
}
