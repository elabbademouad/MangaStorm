import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
@Injectable()
export class RessourcesProvider {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _http: HttpClient) {
    this.init();

  }

  /***************************************************
   * Initialize provider
   ****************************************************/
  init() {
    this.stringResources = {
      chapter: "عدد الفصول :",
      state: "الحالة :",
      dateEdition: "سنة الإصدار :",
      tags: "التصنيفات :",
      resume: "نبذة عن القصة :",
      name: "الإسم :",
      mangaList: "قائمة  المانغا",
      search: "بحث",
      home: "الرئيسية",
      chapters: "الفصول",
      infos: "نبذة",
      chapterTitle: "الفصل ",
      loading: "جاري التحميل...",
      downloads: "التحميلات",
      favoris: "المفضلة",
      addFavoriteSuccess: "أضيفت إلى المفضلة بنجاح",
      removeFavorite: "حذفت من المفضلة بنجاح",
    }
    this.sqlScript = {
      createMangaTable: "CREATE TABLE IF NOT EXISTS `Manga`( `Id` TEXT PRIMARY KEY, `Name` TEXT, `Date` TEXT,`ChapterCount` INTEGER, `Resume` TEXT, `Cover` TEXT, `State` TEXT, `Tags` TEXT, `IsFavorite` INTEGER DEFAULT 0, `IsDownloaded` INTEGER DEFAULT 0);",
      createChapterTable: "CREATE TABLE IF NOT EXISTS `Chapter`( `Id` TEXT PRIMARY KEY, `Number` INTEGER NOT NULL, `Title` TEXT, `MangaId` TEXT NOT NULL);",
      createPageTable: " CREATE TABLE IF NOT EXISTS `Page`( `Id` TEXT PRIMARY KEY, `Number` INTEGER NOT NULL, `fileName` TEXT, `ChapterId` TEXT NOT NULL);",
      createReadChapter: "CREATE TABLE IF NOT EXISTS `ReadChapter`( `Id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `MangaName` TEXT, `ChapterNumber` TEXT,`ChapterName` TEXT, `Date` TEXT);",
      createManga: "INSERT INTO `Manga` ( `Id`,`Name`, `Date`,`ChapterCount`, `Resume` , `Cover`, `State`, `Tags` , `IsFavorite`, `IsDownloaded`) VALUES( ?,?,?,?,?,?,?,?,?,?);",
      insertChapterAsRead: "INSERT INTO `ReadChapter` ( `MangaName`,`ChapterNumber` , `ChapterName`,`Date`) VALUES( ?,?,?,?);",
      selectAllManga: "SELECT * FROM `Manga`",
      updateManga: "UPDATE `Manga` SET `State`=? ,`ChapterCount`=? ,`Name`=? WHERE `Id`=?;",
      selectMangaIds: "SELECT Id FROM Manga",
      selectFavoriteManga: "SELECT * FROM Manga where isFavorite=?;",
      checkIfMangaExists: "SELECT Id FROM Manga WHERE Id=?",
      setMangaAsFavorite: "UPDATE Manga SET IsFavorite=? WHERE Id=?",
      getReadChapters: "SELECT `ChapterNumber` FROM `ReadChapter` WHERE `MangaName`=? ",
    }
  }
  /****************************************************
   * Public properties
   *****************************************************/
  stringResources:any;
  sqlScript: {
    createMangaTable ? : string;createChapterTable ? : string;createPageTable ? : string;createReadChapter ? : string;createManga ? : string;insertChapterAsRead: any;selectAllManga ? : string;updateManga ? : string;selectMangaIds ? : string;selectFavoriteManga ? : string;checkIfMangaExists ? : string;setMangaAsFavorite ? : string;getReadChapters ? : string
  };

}
