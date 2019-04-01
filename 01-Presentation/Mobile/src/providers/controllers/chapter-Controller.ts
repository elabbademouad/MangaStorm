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
    this.urlBase = "http://35.211.13.59";
  }
  /****************************************************
  * properties
 *****************************************************/
  urlBase: string;
  getChaptersByMangaId:string="/api/chapter/GetChaptersByMangaId/";
  /****************************************************
  * Public methodes
 *****************************************************/
  public getByMangaId(mangaId:string) {
    return this._http.get<Array<Chapter>>(this.urlBase + this.getChaptersByMangaId+mangaId);
  }


}
