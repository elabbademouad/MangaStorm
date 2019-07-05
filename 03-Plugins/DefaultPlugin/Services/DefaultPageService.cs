using Application.Entities;
using Application.Interfaces;
using Application.Services;
using DefaultPlugin.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DefaultPlugin.Services
{
    public class DefaultPageService : IPageService
    {
        private IPageRepository _pageRepository;

        public DefaultPageService(IPageRepository pageRepository)
        {
            _pageRepository = pageRepository;
        }

        public List<Page> GetPagesByChapterId(object id)
        {
            var result = _pageRepository.Query(p => (Guid)p.ChapterId == Guid.Parse(id.ToString()));
            return result.OrderBy(p => p.Number).ToList();
        }
    }
}
