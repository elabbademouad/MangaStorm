import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private baseUrl:string="http://localhost:5000/"
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
