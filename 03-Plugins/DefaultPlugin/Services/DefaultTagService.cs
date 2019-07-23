using Application.Interfaces;
using Application.Services;
using DefaultPlugin.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DefaultPlugin.Services
{
    public class DefaultTagService : ITagService
    {
        private ITagRepository _tagRepository;
        public DefaultTagService(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public List<string> GetAllTagsLabel()
        {
            var tags = _tagRepository.GetAll();
            if (tags != null && tags.Count != 0)
            {
                return tags.Select(t => t.Label).ToList();
            }
            return null;
        }
    }
}
