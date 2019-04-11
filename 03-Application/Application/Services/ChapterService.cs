using Application.Entities;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

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
            var result = _chapterRepository.Query(c => c.MangaId == id);
            return result.OrderBy(c => c.Number).ToList();
        }
        public Chapter GetNextChapter(Guid mangaId, int currentChapterNumber)
        {
            var result = _chapterRepository.Query(c => c.MangaId == mangaId && c.Number == currentChapterNumber + 1).FirstOrDefault();
            return result;
        }
        public Chapter GetPreviousChapter(Guid mangaId, int currentChapterNumber)
        {
            var result = _chapterRepository.Query(c => c.MangaId == mangaId && c.Number == currentChapterNumber - 1).FirstOrDefault();
            return result;
        }
    }
}
