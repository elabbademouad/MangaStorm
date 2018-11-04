import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangaItemModel } from '../../Model/MangaItemModel';

@Injectable()
export class MangaProvider {

  constructor(public _http: HttpClient) {
    
  }
  public GetData(){
      
    
      return this._http.get("http://localhost:5000/api/manga/GetMangaItems");
  }

}