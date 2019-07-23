using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Services
{
    public interface ITagService
    {
        List<string> GetAllTagsLabel();
    }
}
