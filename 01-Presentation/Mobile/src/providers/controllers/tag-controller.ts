import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class TagController{
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
    this.getAllApi="/api/tag/GetAll";
  }
  /****************************************************
  * properties
 *****************************************************/
  urlBase: string;
  getAllApi:string;
  /****************************************************
  * Public methodes
 *****************************************************/
  public getAll(source:any) {
    return this._http.get<Array<string>>(this.urlBase + this.getAllApi+source);
  }
}
