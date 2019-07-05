import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangaDetails } from '../../Model/manga-details-model';
@Injectable()
export class MangaController {

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
  private urlBase: string;
  private getAllApiUrl:any=(page:number)=>{return this.urlBase + `/api/manga/GetAll?page=${page}`;};
  private getByIdApiUrl:any=(mangaId:any)=>{return this.urlBase + `/api/manga/GetById?mangaId=${mangaId}`;};
  private getMangaListHasNewChapterApiUrl:any=(count:any)=>{return this.urlBase + `/api/manga/GetMangaListHasNewChapter?count=${count}`;};//string="/api/manga/GetMangaListHasNewChapter/";
  private getMostViewedApiUrl:any=(count:any)=>{return this.urlBase + `/api/manga/GetMostViewed?count=${count}`;};
  private getForYouListApiUrl:any=(count:any)=>{return this.urlBase + `/api/manga/GetForYouList?count=${count}`;};
  /****************************************************
  * Public methodes
 *****************************************************/
  public getAll(page:number=1) {
    return this._http.get<Array<MangaDetails>>(this.getAllApiUrl(page));
  }

  public getById(id:string) {
    return this._http.get<MangaDetails>(this.getByIdApiUrl(id));
  }

  public getForYouList(count:any,tags:Array<string>){
    let params=new HttpParams().set("count",count);
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      params=params.set("tags["+index+"]",element);
    }
    return this._http.get<Array<MangaDetails>>(this.getForYouListApiUrl(count),{params:params});
  }

  public getMangaListHasNewChapter(count:number){
    return this._http.get<Array<MangaDetails>>(this.getMangaListHasNewChapterApiUrl(count));
  }
  public getMostViewed(count:number){
    return this._http.get<Array<MangaDetails>>(this.getMostViewedApiUrl(count));
  }

}
