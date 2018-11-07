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
            string rootPath = "http://192.168.1.74:5000/";
            string connectionString = "Data Source=F:/Manga/ManagDb.db";
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

        [HttpGet("GetTags")]
        public ActionResult<IEnumerable<string>> GetTags()
        {
            List<string> tags = new List<string>();
            using (var db=new MangaDataContext("Data Source=F:/Manga/ManagDb.db"))
            {
                var tagsData=db.Mangas.Select(m => m.Tags);
                foreach (var tagCollection in tagsData)
                {
                    foreach (var tag in tagCollection.Split(" "))
                    {
                        if(!tags.Contains(tag))
                        {
                            tags.Add(tag);
                        }
                    }
                }
            }
            return tags;
        }
    }
}
