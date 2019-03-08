import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private baseUrl:string="http://localhost:5000/"
  private getPagesByChapterId:string="api/Page/GetPagesByChapterId/";

  constructor(public _http:HttpClient) { }

  public getChaptersByMangaId(chapterId:string){
    return this._http.get(this.baseUrl+this.getPagesByChapterId+chapterId);
  }
}