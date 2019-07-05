import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chapter } from '../../Model/chapter-model';
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
  getChaptersByMangaIdApiUrl:any=(mangaId: any)=>{return this.urlBase + `/api/chapter/GetChaptersByMangaId?mangaId=${mangaId}`;};
  getNextChapterApiUrl:any=(currentChapter:any,mangaId: any)=>{ return this.urlBase + `/api/chapter/GetNextChapter?currentChapter=${currentChapter}?mangaId=${mangaId}`};
  getPreviousChapterApiUrl:any=(currentChapter:any,mangaId: any)=>{ return this.urlBase + `/api/chapter/GetPreviousChapter?currentChapter=${currentChapter}?mangaId=${mangaId}`};
  /****************************************************
  * Public methodes
 *****************************************************/
  public getByMangaId(mangaId:string) {
    return this._http.get<Array<Chapter>>(this.getChaptersByMangaIdApiUrl(mangaId));
  }
  public getNextChapter(mangaId:string,currentChapter:any) {
    return this._http.get<Chapter>(this.getNextChapterApiUrl(currentChapter,mangaId));
  }
  public getPreviousChapter(mangaId:string,currentChapter:any) {
    return this._http.get<Chapter>(this.getPreviousChapterApiUrl(currentChapter,mangaId));
  }

}
