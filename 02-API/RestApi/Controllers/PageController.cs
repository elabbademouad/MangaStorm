using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
        private readonly PageService _pageService;
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

        [HttpGet("UploadPage")]
        public string UploadPage([FromHeader]  string url, [FromHeader]  string mediaPath, [FromHeader]  string path, [FromHeader]  string fileName)
        {

            try
            {
                using (WebClient webclient = new WebClient())
                {
                    Directory.CreateDirectory(mediaPath + path);
                    webclient.DownloadFile(url, mediaPath + path + "/" + fileName);
                    webclient.Dispose();
                    return path + "/" + fileName;
                }
            }
            catch (Exception ex)
            {
                return "";
            }
        }
    }
}
