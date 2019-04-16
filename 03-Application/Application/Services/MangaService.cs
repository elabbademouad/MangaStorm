using Application.Entities;
using Application.Interfaces;
using Application.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.Services
{
    public class MangaService
    {
        private readonly IMangaRepository _mangaRepository;
        private readonly IChapterRepository _chapterRepository;
        public MangaService(IMangaRepository mangaRepository, IChapterRepository chapterRepository)
        {
            _mangaRepository = mangaRepository;
            _chapterRepository = chapterRepository;
        }
        public List<Manga> GetAllManga()
        {
            return _mangaRepository.GetAll();
        }

        public void CreateManga(Manga manga)
        {
            _mangaRepository.Create(manga);
        }

        public List<MangaDetails> GetMangaDetailsList()
        {
            List<MangaDetails> mangaDetailsList = new List<MangaDetails>();
            Random rdm = new Random();
            var mangaList = this.GetAllManga().OrderBy((m) => rdm.Next());
            foreach (var manga in mangaList)
            {
                mangaDetailsList.Add(new MangaDetails
                {
                    Cover = manga.CoverInternalUrl,
                    Date = manga.Date,
                    Id = manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views
                });
            }
            return mangaDetailsList;
        }

        public MangaDetails GetMangaDetailsById(Guid mangaId)
        {
            var manga = _mangaRepository.GetById(mangaId);
            return new MangaDetails()
            {
                Cover = manga.CoverInternalUrl,
                Date = manga.Date,
                Id = manga.Id,
                Name = manga.Name,
                Resume = manga.Resume,
                State = manga.State,
                Tags = manga.Tags,
                CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                Views = manga.Views
            };
        }

        public List<MangaDetails> GetNewList(int count)
        {
            var result = _mangaRepository.GetAll().OrderByDescending(m => m.CreatedDate).Take(count);
            var mangaDetailsList = new List<MangaDetails>();
            foreach (var manga in result)
            {
                mangaDetailsList.Add(new MangaDetails
                {
                    Cover = manga.CoverInternalUrl,
                    Date = manga.Date,
                    Id = manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views
                });
            }
            return mangaDetailsList;
        }
        public List<MangaDetails> GetMangaForYou(int count, List<string> tag)
        {

            return null;
        }

        public List<MangaDetails> GetMostViewed(int count)
        {
            var mangalist = _mangaRepository.GetAll().OrderByDescending(m => m.Views).Take(count);
            var mangaDetailsList = new List<MangaDetails>();
            foreach (var manga in mangalist)
            {
                mangaDetailsList.Add(new MangaDetails
                {
                    Cover = manga.CoverInternalUrl,
                    Date = manga.Date,
                    Id = manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views
                });
            }
            return mangaDetailsList;
        }

        public List<MangaDetails> GetMangaListHasNewChapter(int count)
        {
            var mangaIdsHasNewChapter = _chapterRepository.GetAll().OrderByDescending(c => c.CreatedDate).Select(c => c.MangaId).Distinct().Take(count);
            var mangaList = _mangaRepository.Query(m => mangaIdsHasNewChapter.Contains(m.Id));
            var mangaDetailsList = new List<MangaDetails>();
            foreach (var manga in mangaList)
            {
                mangaDetailsList.Add(new MangaDetails
                {
                    Cover = manga.CoverInternalUrl,
                    Date = manga.Date,
                    Id = manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views
                });
            }
            return mangaDetailsList;
        }
    }
}
