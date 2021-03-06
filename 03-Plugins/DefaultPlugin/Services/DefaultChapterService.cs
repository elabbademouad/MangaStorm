﻿using Application.Entities;
using Application.Model;
using Application.Services;
using DefaultPlugin.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DefaultPlugin.Services
{
    public class DefaultChapterService : IChapterService
    {
        private IChapterRepository _chapterRepository;
        public DefaultChapterService(IChapterRepository chapterRepository)
        {
            _chapterRepository = chapterRepository;
        }



        public List<Chapter> GetChaptersByMangaId(object id)
        {
            var result = _chapterRepository.Query(c => (Guid)c.MangaId == Guid.Parse(id.ToString()));
            result.ForEach((item) =>
            {
                item.Source = new Source()
                {
                    Id = 0,
                    Label = "mangaStorm"
                };
            });
            return result.OrderByDescending(c => c.Number).ToList();
        }
        public Chapter GetNextChapter(object mangaId, object currentChapterNumber)
        {
            var result = _chapterRepository.Query(c => (Guid)c.MangaId == Guid.Parse(mangaId.ToString()) && c.Number == (int)currentChapterNumber + 1).FirstOrDefault();
            return result;
        }
        public Chapter GetPreviousChapter(object mangaId, object currentChapterNumber)
        {
            var result = _chapterRepository.Query(c => (Guid)c.MangaId == Guid.Parse(mangaId.ToString()) && c.Number == (int)currentChapterNumber - 1).FirstOrDefault();
            return result;
        }
    }
}
