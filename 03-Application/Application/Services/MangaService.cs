using Application.Entities;
using Application.Interfaces;
using Application.Model;
using System.Collections.Generic;

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
            var mangaList = this.GetAllManga();
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
                });
            }
            return mangaDetailsList;
        }
    }
}
