import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MangaProvider {

  constructor(public _http: HttpClient) {
    
  }

  public GetMangaList(){  
      return this._http.get("http://192.168.1.74:5000/api/manga/GetMangaItems");
  }

  public GetTags(){  
    return this._http.get("http://192.168.1.74:5000/api/manga/GetTags");
  }

}