import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MangaProvider {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _http: HttpClient) {
    this.init();
  }

  
  /***************************************************
  * Initialize component
  ****************************************************/ 
  init(){
    this.urlBase="http://192.168.43.200:5000";
  }
   /****************************************************
   * Public properties
  *****************************************************/
   urlBase:string;
   /****************************************************
   * Public methodes
  *****************************************************/
  public GetMangaList(){  
      return this._http.get(this.urlBase+"/api/manga/GetMangaItems");
  }

  public GetTags(){  
    return this._http.get(this.urlBase+"/api/manga/GetTags");
  }

  public GetChapters(mangaid){  
    return this._http.get(this.urlBase+"/api/manga/GetChaptersById/"+mangaid);
  }

  public GetPagesByChapter(chapterId){
    return this._http.get(this.urlBase+"/api/manga/GetPagesById/"+chapterId);
  }

}