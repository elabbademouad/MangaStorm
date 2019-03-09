import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private baseUrl:string="http://35.211.13.59/"
  private getAllApi:string="api/manga/getAll";
  private getMangaFullDetailApi:string="api/manga/getById/";

  constructor(public _http:HttpClient) { }

  public getAll(){
    return this._http.get(this.baseUrl+this.getAllApi);
  }
  
  public getMangaFullDetail(mangaId:string){
    return this._http.get(this.baseUrl+this.getMangaFullDetailApi+mangaId);
  }
}
