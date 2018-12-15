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
        string connectionString = "Data Source=../../MangaData/Manga/ManagDb.db";
        string rootPath = "https://35.211.13.59:5001/";
        [HttpGet("GetMangaItems")]
        public ActionResult<IEnumerable<MangaItemModel>> GetMangaItems()
        {
            using (var db =new MangaDataContext(connectionString))
            {
                var mangaList=db.Mangas.Include(m=>m.Chapters)
                        .Select(m=>new MangaItemModel() {
                            Id=m.Id,
                            ChapterCount=m.Chapters.Count.ToString(),
                            Cover= rootPath+ m.CoverInternalUrl,
                            Date=m.Date,
                            Name=m.Name,
                            Resume=m.Resume,
                            State=m.State,
                            Tags=m.Tags,
                            Matricule=m.Matricule
                        }).ToList();
                return Ok(mangaList);
            }
        }

        [HttpGet("GetTags")]
        public ActionResult<IEnumerable<string>> GetTags()
        {
            List<string> tags = new List<string>();
            using (var db=new MangaDataContext(connectionString))
            {

                return Ok(db.Tags.Select(t=>t.Label).ToList());
            }
            
        }

        [HttpGet("GetChaptersByMatricule/{matricule}")]
        public ActionResult<IEnumerable<Chapter>> GetChaptersById(string matricule)
        {
            using (var db=new MangaDataContext(connectionString))
            {
                var chapters = db.Mangas.Include(m => m.Chapters)
                                        .Where(m=>m.Matricule==matricule)
                                        .First()
                                        .Chapters
                                        .OrderByDescending(c=>c.Number);
                return Ok(chapters);
            }
        }
        [HttpGet("GetPagesById/{chapterId}")]
        public ActionResult<IEnumerable<Page>> GetPagesById(int chapterId)
        {
            using (var db = new MangaDataContext(connectionString))
            {
                var pages = db.Chapters.Include(c=>c.Pages)
                                    .Where(c => c.Id == chapterId)
                                    .First()
                                    .Pages
                                    .Select(p=>new Page()
                                    {
                                        Id=p.Id,
                                        ChapterId=p.ChapterId,
                                        InternalUrl=rootPath+p.InternalUrl,
                                        Number=p.Number,
                                        ExternalUrl=p.ExternalUrl,
                                        Pending=p.Pending
                                    })
                                    .OrderBy(c => c.Number);                
                return Ok(pages);
            }
        }
    }
}
