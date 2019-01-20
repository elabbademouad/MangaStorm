using Application.Entities;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

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
            return _pageRepository.Query(p => p.ChapterId == id);
        }
    }
}
