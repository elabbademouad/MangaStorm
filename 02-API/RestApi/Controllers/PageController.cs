using Api.Helpers;
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
        public ActionResult<IEnumerable<PageModel>> GetPagesByChapterId(PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                string chapterId = Request.QueryString.Value.Split("chapterId=")[1];
                var result = _cache.GetOrCreate<List<PageModel>>(string.Format(CacheKeys.PAGES, chapterId), (cachEntry) =>
                {
                    var pageService = _pageServiceDelegate(source);
                    return Mapper.Map<List<PageModel>>(pageService.GetPagesByChapterId(chapterId));
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("DownloadImage")]
        public ActionResult<string> DownloadImage(string url)
        {

            try
            {
                return Ok(this.ToBase64(url));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("DownloadChapter")]
        public ActionResult<List<PageModel>> DownloadChapter(PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                string chapterId = Request.QueryString.Value.Split("chapterId=")[1];
                var result = _cache.GetOrCreate(string.Format(CacheKeys.DOWNLOADCHAPTER, chapterId), (c) =>
                {
                    var pageService = _pageServiceDelegate(source);
                    var pages = Mapper.Map<List<PageModel>>(pageService.GetPagesByChapterId(chapterId));
                    foreach (var item in pages)
                    {
                        item.Base64 = this.ToBase64(item.Url);
                    }
                    return pages;
                });
                return result;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private string ToBase64(string url)
        {
            try
            {
                string output = "data:image/{0};base64,{1}";
                string base64 = ImageHelper.ConvertImageURLToBase64(url);
                var temp = url.Split('.');
                string format = temp[temp.Length - 1];
                return string.Format(output, format, base64);
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
