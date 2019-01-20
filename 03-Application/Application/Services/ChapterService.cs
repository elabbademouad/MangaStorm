using Application.Entities;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services
{
    public class ChapterService
    {
        private IChapterRepository _chapterRepository;
        public ChapterService(IChapterRepository chapterRepository)
        {
            _chapterRepository = chapterRepository;
        }

        public List<Chapter> GetChaptersByMangaId(Guid id)
        {
            return _chapterRepository.Query(c => c.MangaId == id);
        }
    }
}
