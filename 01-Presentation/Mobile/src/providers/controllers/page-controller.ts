import { HttpClient } from "@angular/common/http";
import { Page } from "../../Model/page-model";
import { Injectable } from "@angular/core";
@Injectable()
export class PageController{
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
    this.getByChapterIdApi="/api/page/GetPagesByChapterId/";
  }
  /****************************************************
  * properties
 *****************************************************/
  urlBase: string;
  getByChapterIdApi:string;
  /****************************************************
  * Public methodes
 *****************************************************/
  public getByChapterId(chapterId:string) {
    return this._http.get<Array<Page>>(this.urlBase + this.getByChapterIdApi+chapterId);
  }
}
