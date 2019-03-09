import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  private baseUrl:string="http://35.211.13.59/"
  private getChaptersByMangaIdApi:string="api/Chapter/GetChaptersByMangaId/";

  constructor(public _http:HttpClient) { }

  public getChaptersByMangaId(mangaId:string){
    return this._http.get(this.baseUrl+this.getChaptersByMangaIdApi+mangaId);
  }
}
