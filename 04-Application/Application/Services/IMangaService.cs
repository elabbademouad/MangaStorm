using Application.Entities;
using Application.Interfaces;
using Application.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Services
{
    public interface IMangaService
    {
        List<Manga> GetAllManga();

        List<MangaDetails> GetMangaDetailsList(object page = null, object filtre = null, object tag = null);

        MangaDetails GetMangaDetailsById(object mangaId);

        List<MangaDetails> GetNewList(int count);
        List<MangaDetails> GetMangaForYou(int count, List<string> tag);

        List<MangaDetails> GetMostViewed(int count);

        List<MangaDetails> GetMangaListHasNewChapter(int count);
    }
}
