import { HttpClient } from "@angular/common/http";
import { Page } from "../../Model/page-model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
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
    this.urlBase = "http://192.168.43.200:5000";
    this.getByChapterIdApiUrl=(chapterId:string,source:any)=>{return this.urlBase + `/api/page/GetPagesByChapterId?chapterId=${chapterId}&source=${source}`};
    this.downloadApiUrl=(url:string)=>{return this.urlBase + `/api/page/DownloadImage?url=${url}`};
  }
  /****************************************************
  * properties
 *****************************************************/
  urlBase: string;
  getByChapterIdApiUrl:any;
  downloadApiUrl:any;
  downloadChapterApiUrl:any=(chapterId: any,source:any)=>{ return this.urlBase + `/api/page/DownloadChapter?chapterId=${chapterId}&source=${source}`};
  /****************************************************
  * Public methodes
 *****************************************************/
  public getByChapterId(chapterId:string,source:any) {
    return this._http.get<Array<Page>>(this.getByChapterIdApiUrl(chapterId,source));
  }
  public downloadImage(url:string):Observable<string>{
    return this._http.get<string>(this.downloadApiUrl(url),{ responseType : 'text' as 'json'});
  }
  public downloadChapter(chapterId:string,source:any) {
    return this._http.get<Array<Page>>(this.downloadChapterApiUrl(chapterId,source));
  }
}
