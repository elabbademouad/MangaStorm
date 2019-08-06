using Application.Entities;
using Application.Model;
using Application.Services;
using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShqqaaPlugin.Services
{
    public class ShaqqaaMangaService : IMangaService
    {
        public List<Manga> GetAllManga()
        {
            throw new NotImplementedException();
        }

        public MangaDetails GetMangaDetailsById(object mangaId)
        {
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load(mangaId.ToString());
            var cover = htmlDocument.DocumentNode.SelectSingleNode(".//img[@class='img-thumbnail lazy mb-3']").Attributes["data-src"].Value;
            var name = htmlDocument.DocumentNode.SelectNodes(".//small[@class='text-muted']")[0].InnerText;
            var resume = htmlDocument.DocumentNode.SelectNodes(".//p[@class='text-muted']")[0].InnerText;
            var state = htmlDocument.DocumentNode.SelectSingleNode(".//div[@class='col-sm-12 col-md-4 col-lg-3 order-md-2 mb-3 text-center']").SelectNodes(".//span")[1].InnerText;
            var chapterCount = htmlDocument.DocumentNode.SelectNodes(".//a[@class='btn btn-light m-1']").Count;

            return new MangaDetails()
            {
                Id = mangaId,
                Cover = cover,
                Resume = resume,
                Name = name,
                State = state,
                CountChapters = chapterCount,
                Rating = "4",
                Views = 2039827,
                Date = "-",
                Tags = "",
                Source = new Source()
                {
                    Id = 2,
                    Label = "shqqaa.com",
                }
            };
        }

        public List<MangaDetails> GetMangaDetailsList(object page = null, object filtre = null, object tag = null)
        {
            if (page == null)
            {
                page = 1;
            }
            if (filtre == null)
            {
                filtre = "";
            }
            Func<MangaDetails, bool> filterPredicate = (m) => { return m.Name.ToLower().Contains(filtre.ToString().ToLower()); };
            var list = new List<MangaDetails>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load($"https://www.shqqaa.com/manga/");
            var mangaListHtmlExtract = htmlDocument.DocumentNode.SelectNodes("//div[@class='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 m-0']");
            foreach (var item in mangaListHtmlExtract)
            {
                var id = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").Attributes["href"].Value;
                var name = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").InnerText;
                var cover = item.SelectSingleNode(".//img").Attributes["data-src"].Value;
                var resume = item.SelectSingleNode(".//div[@class='card-text cdescription p-2 text-muted']").SelectSingleNode(".//small").InnerText;

                list.Add(new MangaDetails()
                {
                    Id = id,
                    Cover = cover,
                    Resume = resume,
                    Name = name,
                    Tags = "",
                    Source = new Source()
                    {
                        Id = 2,
                        Label = "shqqaa.com",
                    }
                });
            }
            List<MangaDetails> mangaList = list.Where(m => filterPredicate(m))
                                        .ToList();
            List<MangaDetails> result = new List<MangaDetails>();
            int[] interval = new int[2];
            interval[0] = (int.Parse(page.ToString()) - 1) * 9;
            interval[1] = ((int.Parse(page.ToString())) * 9) - 1;
            if (mangaList != null)
            {
                for (var i = 0; i <= mangaList.Count() - 1; i++)
                {
                    if (interval[0] <= i && interval[1] >= i)
                    {
                        result.Add(mangaList[i]);
                    }
                }
            }
            return result;
        }

        public List<MangaDetails> GetMangaForYou(int count, List<string> tag)
        {
            var list = new List<MangaDetails>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load($"https://www.shqqaa.com/manga/");
            var mangaListHtmlExtract = htmlDocument.DocumentNode.SelectNodes("//div[@class='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 m-0']");
            foreach (var item in mangaListHtmlExtract)
            {
                var id = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").Attributes["href"].Value;
                var name = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").InnerText;
                var cover = item.SelectSingleNode(".//img").Attributes["data-src"].Value;
                var resume = item.SelectSingleNode(".//div[@class='card-text cdescription p-2 text-muted']").SelectSingleNode(".//small").InnerText;
                list.Add(new MangaDetails()
                {
                    Id = id,
                    Cover = cover,
                    Resume = resume,
                    Name = name,
                    Tags = "",
                    Source = new Source()
                    {
                        Id = 2,
                        Label = "shqqaa.com",
                    }
                });
            }
            Random rnd = new Random();
            return list.OrderBy(m => rnd.Next()).Take(count).ToList();
        }

        public List<MangaDetails> GetMangaListHasNewChapter(int count)
        {
            HtmlWeb htmlWebNewChapters = new HtmlWeb();
            HtmlDocument htmlDocumentNewChapter = htmlWebNewChapters.Load($"https://www.shqqaa.com/manga/chapters/");

            var newChapterHtmlExtract = htmlDocumentNewChapter.DocumentNode.SelectNodes(".//div[@class='text-truncate card-title mb-0']");
            List<string> newChapterStrings = new List<string>();
            foreach (var item in newChapterHtmlExtract)
            {
                if (newChapterStrings.Count < count)
                {
                    var temp = item.SelectSingleNode(".//small").InnerText.ToLower();
                    if (!newChapterStrings.Contains(temp))
                    {
                        newChapterStrings.Add(temp);
                    }
                }
            }

            var allMangalist = new List<MangaDetails>();
            HtmlWeb htmlWebAllManga = new HtmlWeb();
            HtmlDocument htmlDocumentAllManga = htmlWebAllManga.Load($"https://www.shqqaa.com/manga/");
            var mangaListHtmlExtract = htmlDocumentAllManga.DocumentNode.SelectNodes("//div[@class='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 m-0']");
            foreach (var item in mangaListHtmlExtract)
            {
                var id = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").Attributes["href"].Value;
                var name = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").InnerText;
                var cover = item.SelectSingleNode(".//img").Attributes["data-src"].Value;
                var resume = item.SelectSingleNode(".//div[@class='card-text cdescription p-2 text-muted']").SelectSingleNode(".//small").InnerText;
                allMangalist.Add(new MangaDetails()
                {
                    Id = id,
                    Cover = cover,
                    Resume = resume,
                    Name = name,
                    Tags = "",
                    Source = new Source()
                    {
                        Id = 2,
                        Label = "shqqaa.com",
                    }
                });
            }
            return allMangalist.Where(m => newChapterStrings.Contains(m.Name.ToLower())).ToList();
        }

        public List<MangaDetails> GetMostViewed(int count)
        {
            var list = new List<MangaDetails>();
            HtmlWeb htmlWeb = new HtmlWeb();
            HtmlDocument htmlDocument = htmlWeb.Load($"https://www.shqqaa.com/manga/");
            var mangaListHtmlExtract = htmlDocument.DocumentNode.SelectNodes("//div[@class='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2 m-0']");
            foreach (var item in mangaListHtmlExtract)
            {
                var id = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").Attributes["href"].Value;
                var name = item.SelectSingleNode(".//h6[@class='card-title text-center text-truncate mb-0']").SelectSingleNode(".//a").InnerText;
                var cover = item.SelectSingleNode(".//img").Attributes["data-src"].Value;
                var resume = item.SelectSingleNode(".//div[@class='card-text cdescription p-2 text-muted']").SelectSingleNode(".//small").InnerText;
                list.Add(new MangaDetails()
                {
                    Id = id,
                    Cover = cover,
                    Resume = resume,
                    Name = name,
                    Tags = "",
                    Source = new Source()
                    {
                        Id = 2,
                        Label = "shqqaa.com",
                    }
                });
            }
            return list.Take(count).ToList();
        }

        public List<MangaDetails> GetNewList(int count)
        {
            return new List<MangaDetails>();
        }
    }
}
