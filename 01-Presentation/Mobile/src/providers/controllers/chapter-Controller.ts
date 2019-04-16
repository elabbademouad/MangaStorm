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
  getChaptersByMangaId:string="/api/chapter/GetChaptersByMangaId/";
  getNextChapterApi:string="/api/chapter/GetNextChapter/";
  getPreviousChapterApi:string="/api/chapter/GetPreviousChapter/";
  /****************************************************
  * Public methodes
 *****************************************************/
  public getByMangaId(mangaId:string) {
    return this._http.get<Array<Chapter>>(this.urlBase + this.getChaptersByMangaId+mangaId);
  }
  public getNextChapter(mangaId:string,currentChapterNumber:number) {
    return this._http.get<Chapter>(this.urlBase + this.getNextChapterApi+mangaId+"/"+currentChapterNumber);
  }
  public getPreviousChapter(mangaId:string,currentChapterNumber:number) {
    return this._http.get<Chapter>(this.urlBase + this.getPreviousChapterApi+mangaId+"/"+currentChapterNumber);
  }


}
