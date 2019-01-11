using System;
using System.Collections.Generic;
using System.Text;

namespace MangaScrap.ScrapParams
{
    public static class Params
    {
        public static readonly string RootPath = "F:";
        public static readonly List<string> MangaUrls = new List<string>()
        {
            "https://www.manga.ae/one-piece-green-secret-pieces/"
        };
        public static readonly string ConnectionString = "Data Source=" +RootPath + "/Manga/ManagDb.db";
    }
}
