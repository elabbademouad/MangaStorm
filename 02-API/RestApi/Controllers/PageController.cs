using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageController : ControllerBase
    {
        private PageService _pageService;
        public PageController(PageService pageService)
        {
            _pageService = pageService;
        }
        [HttpGet("GetPagesByChapterId/{chapterId}")]
        public ActionResult<IEnumerable<PageModel>> GetPagesByChapterId(Guid chapterId)
        {
            var result = Mapper.Map<List<PageModel>>(_pageService.GetPagesByChapterId(chapterId));
            return Ok(result);
        }

    }
}
