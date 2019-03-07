using Api.Helpers;
using Application.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Model;
using System;
using System.Collections.Generic;
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
        public string UploadPage([FromHeader] string url, [FromHeader]  string mediaPath, [FromHeader]  string path, [FromHeader]  string fileName)
        {
            string result = ImageHelper.SavaFile(url, mediaPath, path, fileName);
            if (string.IsNullOrEmpty(result))
            {
                for (int i = 0; i < 10; i++)
                {
                    if (string.IsNullOrEmpty(result))
                    {
                        result = ImageHelper.SavaFile(url, mediaPath, path, fileName);
                    }
                }
            }
            return result;
        }
    }
}
