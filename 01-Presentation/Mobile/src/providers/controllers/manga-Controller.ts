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
  private getAllApi:string="/api/manga/GetAll";
  private getByIdApi:string="/api/manga/GetById/";
  private getForYouListApi:string="/api/manga/GetForYouList";
  private getNewListApi:string="/api/manga/GetNewList/";
  private getMangaListHasNewChapterApi:string="/api/manga/GetMangaListHasNewChapter/";
  private getMostViewedApi:string="/api/manga/GetMostViewed/";
  /****************************************************
  * Public methodes
 *****************************************************/
  public getAll() {
    return this._http.get<Array<MangaDetails>>(this.urlBase + this.getAllApi);
  }

  public getById(id:string) {
    return this._http.get<MangaDetails>(this.urlBase + this.getByIdApi+id);
  }

  public getForYouList(count:any,tags:Array<string>){
    let params=new HttpParams().set("count",count);
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      params=params.set("tags["+index+"]",element);
    }
    return this._http.get<Array<MangaDetails>>(this.urlBase+this.getForYouListApi,{params:params});
  }

  public getNewList(count:number){
    return this._http.get<Array<MangaDetails>>(this.urlBase+this.getNewListApi+count);
  }

  public getMangaListHasNewChapter(count:number){
    return this._http.get<Array<MangaDetails>>(this.urlBase+this.getMangaListHasNewChapterApi+count);
  }
  public getMostViewed(count:number){
    return this._http.get<Array<MangaDetails>>(this.urlBase+this.getMostViewedApi+count);
  }

}
