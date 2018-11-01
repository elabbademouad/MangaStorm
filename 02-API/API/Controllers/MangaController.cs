using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DataAccess.DataContext;
using DataAccess.Entity;
namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MangaController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Manga>> Get()
        {
            using (var db =new MangaDataContext("Data source = C:/Users/Elabbade Mouad/Documents/VisualStudioProjects/MangaApp/03-DataAccess/DataAccess/ManagDb.db"))
            {
                return db.Mangas.ToList();
            }
        }
    }
}
