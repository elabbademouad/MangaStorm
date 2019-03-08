using Application.Entities;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Services
{
    public class PageService
    {
        private IPageRepository _pageRepository;

        public PageService(IPageRepository pageRepository)
        {
            _pageRepository = pageRepository;
        }

        public List<Page> GetPagesByChapterId(Guid id)
        {
            var result = _pageRepository.Query(p => p.ChapterId == id);
            return result.OrderBy(p => p.Number).ToList();
        }
    }
}
