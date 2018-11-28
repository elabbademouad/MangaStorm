import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable()
export class RessourcesProvider {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _http:HttpClient) {
    this.init();
    
  }

  /***************************************************
  * Initialize provider
  ****************************************************/ 
   init(){
    this.stringResources={
      "chapter" : "عدد الفصول :",
      "state" : "الحالة :",
      "dateEdition" : "سنة الإصدار :",
      "tags" : "التصنيفات :",
      "resume" : "نبذة عن القصة :",
      "name" : "الإسم :",
      "mangaList" : "قائمة  المانغا",
      "search" : "بحث",
      "home" : "الرئيسية",
      "chapters" : "الفصول",
      "infos" : "نبذة",
      "chapterTitle" :'الفصل ',
      "loading":'جاري التحميل...',
      "downloads":"التحميلات",
      "favoris":"المفضلة",
      "addFavoriteSuccess":"أضيفت إلى المفضلة بنجاح",
      "removeFavorite":"حذفت من المفضلة بنجاح"
      };
    this.sqlScript={
      createMangaTable:"CREATE TABLE IF NOT EXISTS `Manga`( `Id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `Name` TEXT,`Matricule` TEXT, `Date` TEXT,`ChapterCount` INTEGER, `Resume` TEXT, `Cover` TEXT, `State` TEXT, `Tags` TEXT, `IsFavorite` INTEGER DEFAULT 0, `IsDownloaded` INTEGER DEFAULT 0);",
      createChapterTable:"CREATE TABLE IF NOT EXISTS `Chapter`( `Id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `Number` INTEGER NOT NULL, `Title` TEXT, `MangaId` INTEGER NOT NULL);",
      createPageTable:" CREATE TABLE IF NOT EXISTS `Page`( `Id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `Number` INTEGER NOT NULL, `fileName` TEXT, `ChapterId` INTEGER NOT NULL);",
      createReadChapter:"CREATE TABLE IF NOT EXISTS `ReadChapter`( `Id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `MangaName` TEXT, `ChapterNumber` INTEGER NOT NULL, `Date` TEXT);",
      createManga:"INSERT INTO `Manga` ( `Name`,`Matricule` , `Date`,`ChapterCount`, `Resume` , `Cover`, `State`, `Tags` , `IsFavorite`, `IsDownloaded`) VALUES( ?,?,?,?,?,?,?,?,?,?);",
      selectAllManga:"SELECT * FROM `Manga`",
      updateManga:"UPDATE `Manga` SET `State`=? ,`ChapterCount`=? ,`Name`=? WHERE `Matricule`=?;",
    }
  }
  /****************************************************
   * Public properties
  *****************************************************/
  stringResources:any
  sqlScript:any
  
}
