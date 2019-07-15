using Application.Entities;
using Application.Interfaces;
using Application.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Services
{
    public interface IChapterService
    {
        List<Chapter> GetChaptersByMangaId(object id);
        Chapter GetNextChapter(object mangaId, object currentChapterNumber);
        Chapter GetPreviousChapter(object mangaId, object currentChapterNumber);
    }
}
