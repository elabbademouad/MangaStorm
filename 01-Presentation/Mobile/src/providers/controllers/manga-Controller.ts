import { HttpClient } from '@angular/common/http';
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
    this.urlBase = "http://35.211.13.59";
  }
  /****************************************************
  * properties
 *****************************************************/
  urlBase: string;
  getAllApi:string="/api/manga/GetAll";
  getByIdApi:string="/api/manga/GetById/";
  /****************************************************
  * Public methodes
 *****************************************************/
  public getAll() {
    return this._http.get<Array<MangaDetails>>(this.urlBase + this.getAllApi);
  }

  public getById(id:string) {
    return this._http.get<MangaDetails>(this.urlBase + this.getAllApi+id);
  }


}
