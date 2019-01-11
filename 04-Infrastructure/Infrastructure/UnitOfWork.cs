using Infrastructure.Repositories;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure
{
    public class UnitOfWork
    {
        public IMongoDatabase DbContext { get; set; }

        private MangaRepository _mangaRepository;
        private ChapterRepository _chapterRepository;
        private PageRepository _pageRepository;
        private TagRepository _tagRepository;

        public UnitOfWork(string connectionString, string databaseName)
        {
            var client = new MongoClient(connectionString);
            DbContext = client.GetDatabase(databaseName);
        }

        public MangaRepository MangaRepository
        {
            get
            {
                if (_mangaRepository == null)
                {
                    _mangaRepository = new MangaRepository(DbContext);
                }
                return _mangaRepository;
            }
        }

        public ChapterRepository ChapterRepository
        {
            get
            {
                if (_chapterRepository == null)
                {
                    _chapterRepository = new ChapterRepository(DbContext);
                }
                return _chapterRepository;
            }
        }

        public PageRepository PageRepository
        {
            get
            {
                if (_pageRepository == null)
                {
                    _pageRepository = new PageRepository(DbContext);
                }
                return _pageRepository;
            }
        }

        public TagRepository TagRepository
        {
            get
            {
                if (_tagRepository == null)
                {
                    _tagRepository = new TagRepository(DbContext);
                }
                return _tagRepository;
            }
        }

    }
}
