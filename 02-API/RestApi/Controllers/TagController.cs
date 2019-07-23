using Application.Services;
using Microsoft.AspNetCore.Mvc;
using RestAPI.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly Func<PluginEnum, ITagService> _tageServiceDelegate;
        public TagController(Func<PluginEnum, ITagService> tagServiceDelegate)
        {
            _tageServiceDelegate = tagServiceDelegate;
        }

        [HttpGet("GetAll")]
        public ActionResult<IEnumerable<string>> GetAll(PluginEnum source = PluginEnum.OnManga)
        {
            try
            {
                var tagService = _tageServiceDelegate(source);
                var result = tagService.GetAllTagsLabel();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
