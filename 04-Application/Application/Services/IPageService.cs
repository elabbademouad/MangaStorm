using Application.Entities;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Services
{
    public interface IPageService
    {
        List<Page> GetPagesByChapterId(object id);
    }
}
