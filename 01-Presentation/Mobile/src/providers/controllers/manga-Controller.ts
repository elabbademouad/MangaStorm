import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    this.urlBase = "http://10.42.6.129:5000";
  }
  /****************************************************
  * properties
 *****************************************************/
  private urlBase: string;
  private getAllApi:string="/api/manga/GetAll";
  private getByIdApi:string="/api/manga/GetById/";
  private GetForYouListApi:string="/api/manga/GetForYouList";
  private GetNewListApi:string="/api/manga/GetNewList/";
  /****************************************************
  * Public methodes
 *****************************************************/
  public getAll() {
    console.log(this.urlBase + this.getAllApi);
    return this._http.get<Array<MangaDetails>>(this.urlBase + this.getAllApi);
  }

  public getById(id:string) {
    return this._http.get<MangaDetails>(this.urlBase + this.getByIdApi+id);
  }

  public GetForYouList(count:any,tags:Array<string>){
    let params=new HttpParams().set("count",count);
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      params=params.set("tags["+index+"]",element);
    }
    return this._http.get(this.urlBase+this.GetForYouListApi,{params:params});
  }

  public GetNewList(count:number){
    return this._http.get(this.urlBase+this.GetNewListApi+count);
  }
}
