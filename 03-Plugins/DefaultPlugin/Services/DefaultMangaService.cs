using Application.Entities;
using Application.Interfaces;
using Application.Model;
using Application.Services;
using DefaultPlugin.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DefaultPlugin.Services
{
    public class DefaultMangaService : IMangaService
    {
        private readonly IMangaRepository _mangaRepository;
        private readonly IChapterRepository _chapterRepository;
        public DefaultMangaService(IMangaRepository mangaRepository, IChapterRepository chapterRepository)
        {
            _mangaRepository = mangaRepository;
            _chapterRepository = chapterRepository;
        }
        public List<Manga> GetAllManga()
        {
            return _mangaRepository.GetAll();
        }

        public List<MangaDetails> GetMangaDetailsList(object page = null, object filtre = null, object tag = null)
        {

            if (page == null)
            {
                page = 1;
            }
            if (tag == null)
            {
                tag = "";
            }
            if (filtre == null)
            {
                filtre = "";
            }
            List<MangaDetails> mangaDetailsList = new List<MangaDetails>();
            Func<Manga, bool> filterPredicate = (m) => { return m.Name.ToLower().Contains(filtre.ToString().ToLower()); };
            Func<Manga, bool> tagPredicate = (m) => { return m.Tags.ToLower().Contains(tag.ToString().ToLower()); };

            List<Manga> mangaList = this.GetAllManga()
                                        .Where(m => filterPredicate(m) && tagPredicate(m))
                                        .ToList();
            int[] interval = new int[2];
            interval[0] = (int.Parse(page.ToString()) - 1) * 12;
            interval[1] = ((int.Parse(page.ToString())) * 12) - 1;
            if (mangaList != null)
            {
                for (var i = 0; i <= mangaList.Count() - 1; i++)
                {
                    if (interval[0] <= i && interval[1] >= i)
                    {
                        mangaDetailsList.Add(new MangaDetails
                        {
                            Cover = mangaList[i].CoverInternalUrl,
                            Date = mangaList[i].Date,
                            Id = mangaList[i].Id,
                            Name = mangaList[i].Name,
                            Resume = mangaList[i].Resume,
                            State = mangaList[i].State,
                            Tags = mangaList[i].Tags,
                            CountChapters = _chapterRepository.Count(c => c.MangaId == mangaList[i].Id),
                            Views = mangaList[i].Views,
                            Source = new Source()
                            {
                                Id = 0,
                                Label = "mangaStorm"
                            }
                        });
                    }
                }
            }
            return mangaDetailsList;
        }

        public MangaDetails GetMangaDetailsById(object mangaId)
        {
            var manga = _mangaRepository.GetById(Guid.Parse(mangaId.ToString()));
            return new MangaDetails()
            {
                Cover = manga.CoverInternalUrl,
                Date = manga.Date,
                Id = (Guid)manga.Id,
                Name = manga.Name,
                Resume = manga.Resume,
                State = manga.State,
                Tags = manga.Tags,
                CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                Views = manga.Views,
                Source = new Source()
                {
                    Id = 0,
                    Label = "mangaStorm"
                }
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
                    Id = (Guid)manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views,
                    Source = new Source()
                    {
                        Id = 0,
                        Label = "mangaStorm"
                    }
                });
            }
            return mangaDetailsList;
        }
        public List<MangaDetails> GetMangaForYou(int count, List<string> tag)
        {
            Random random = new Random();
            var result = _mangaRepository.GetAll().OrderByDescending(m => random.Next()).Take(count);
            var mangaDetailsList = new List<MangaDetails>();
            foreach (var manga in result)
            {
                mangaDetailsList.Add(new MangaDetails
                {
                    Cover = manga.CoverInternalUrl,
                    Date = manga.Date,
                    Id = (Guid)manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views,
                    Source = new Source()
                    {
                        Id = 0,
                        Label = "mangaStorm"
                    }
                });
            }
            return mangaDetailsList;
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
                    Id = (Guid)manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views,
                    Source = new Source()
                    {
                        Id = 0,
                        Label = "mangaStorm"
                    }
                });
            }
            return mangaDetailsList;
        }

        public List<MangaDetails> GetMangaListHasNewChapter(int count)
        {
            //To Do 
            //var mangaIdsHasNewChapter = _chapterRepository.GetAll().OrderByDescending(c => c.CreatedDate).Select(c => c.MangaId).Distinct().Take(count);
            //var mangaList = _mangaRepository.Query(m => mangaIdsHasNewChapter.Contains(m.Id));
            //var mangaDetailsList = new List<MangaDetails>();
            //foreach (var manga in mangaList)
            //{
            //    mangaDetailsList.Add(new MangaDetails
            //    {
            //        Cover = manga.CoverInternalUrl,
            //        Date = manga.Date,
            //        Id = (Guid)manga.Id,
            //        Name = manga.Name,
            //        Resume = manga.Resume,
            //        State = manga.State,
            //        Tags = manga.Tags,
            //        CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
            //        Views = manga.Views,
            //        Source = new Source()
            //        {
            //            Id = 0,
            //            Label = "mangaStorm"
            //        }
            //    });
            //}
            //return mangaDetailsList;
            Random random = new Random();
            var result = _mangaRepository.GetAll().OrderByDescending(m => random.Next()).Take(count);
            var mangaDetailsList = new List<MangaDetails>();
            foreach (var manga in result)
            {
                mangaDetailsList.Add(new MangaDetails
                {
                    Cover = manga.CoverInternalUrl,
                    Date = manga.Date,
                    Id = (Guid)manga.Id,
                    Name = manga.Name,
                    Resume = manga.Resume,
                    State = manga.State,
                    Tags = manga.Tags,
                    CountChapters = _chapterRepository.Count(c => c.MangaId == manga.Id),
                    Views = manga.Views,
                    Source = new Source()
                    {
                        Id = 0,
                        Label = "mangaStorm"
                    }
                });
            }
            return mangaDetailsList;
        }
    }
}
