import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chapter } from '../../Model/chapter-model';
import { ChapterDownload } from '../../Model/chapter-download-model';
import { Page } from 'ionic-angular/navigation/nav-util';
@Injectable()
export class ChapterController {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _http: HttpClient) {
    this.init();
  }


  /***************************************************
  * Initialize component
  ****************************************************/
  init() {
    this.urlBase = "http://192.168.43.200:5000";
  }
  /****************************************************
  * properties
 *****************************************************/
  urlBase: string;
  getChaptersByMangaIdApiUrl:any=(mangaId: any,source:any)=>{return this.urlBase + `/api/chapter/GetChaptersByMangaId?mangaId=${mangaId}&source=${source}`;};
  getNextChapterApiUrl:any=(currentChapter:any,mangaId: any,source:any)=>{ return this.urlBase + `/api/chapter/GetNextChapter?currentChapter=${currentChapter}?mangaId=${mangaId}&source=${source}`};
  getPreviousChapterApiUrl:any=(currentChapter:any,mangaId: any,source:any)=>{ return this.urlBase + `/api/chapter/GetPreviousChapter?currentChapter=${currentChapter}?mangaId=${mangaId}&source=${source}`};
  
  /****************************************************
  * Public methodes
 *****************************************************/
  public getByMangaId(mangaId:string,source:any) {
    return this._http.get<Array<Chapter>>(this.getChaptersByMangaIdApiUrl(mangaId,source));
  }
  public getNextChapter(mangaId:string,currentChapter:any,source:number) {
    return this._http.get<Chapter>(this.getNextChapterApiUrl(currentChapter,mangaId,source));
  }
  public getPreviousChapter(mangaId:string,currentChapter:any,source:number) {
    return this._http.get<Chapter>(this.getPreviousChapterApiUrl(currentChapter,mangaId,source));
  }


}
