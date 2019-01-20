using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Services
{
    public class TagService
    {
        private ITagRepository _tagRepository;
        public TagService(ITagRepository tagRepository)
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
