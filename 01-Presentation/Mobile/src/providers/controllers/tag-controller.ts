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
    this.urlBase = "http://192.168.43.200:5100";
    this.getAllApi=(source:string)=>{return this.urlBase + "/api/tag/GetAll?source="+source;};
  }
  /****************************************************
  * properties
 *****************************************************/
  urlBase: string;
  getAllApi:any;
  /****************************************************
  * Public methodes
 *****************************************************/
  public getAll(source:any) {
    return this._http.get<Array<string>>(this.getAllApi(source));
  }
}
