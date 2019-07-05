using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using RestAPI.Constants;
using RestAPI.Enums;
using RestAPI.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PageController : ControllerBase
    {
        private readonly Func<PluginEnum, IPageService> _pageServiceDelegate;
        private readonly IMemoryCache _cache;
        public PageController(Func<PluginEnum, IPageService> pageServiceDelegate, IMemoryCache cache)
        {
            _pageServiceDelegate = pageServiceDelegate;
            _cache = cache;
        }
        [HttpGet("GetPagesByChapterId")]
        public ActionResult<IEnumerable<PageModel>> GetPagesByChapterId(string chapterId, [FromHeader]PluginEnum source = PluginEnum.OnManga)
        {
            var result = _cache.GetOrCreate<List<PageModel>>(string.Format(CacheKeys.PAGES, chapterId), (cachEntry) =>
             {
                 var pageService = _pageServiceDelegate(source);
                 return Mapper.Map<List<PageModel>>(pageService.GetPagesByChapterId(chapterId));
             });
            return Ok(result);
        }
    }
}
