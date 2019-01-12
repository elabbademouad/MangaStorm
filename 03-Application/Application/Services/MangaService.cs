using Application.Entities;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services
{
    public class MangaService
    {
        private readonly IMangaRepository _mangaRepository;
        public MangaService(IMangaRepository mangaRepository)
        {
            _mangaRepository = mangaRepository;
        }
        public List<Manga> GetAllManga()
        {
            return _mangaRepository.GetAll();
        }

        public void CreateManga(Manga manga)
        {
            _mangaRepository.Create(manga);
        }
    }
}
