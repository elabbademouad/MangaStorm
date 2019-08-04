import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangaDetails } from '../../Model/manga-details-model';
import { SourceViewModel } from '../../ViewModel/source-view-model';
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
    this.urlBase = "http://192.168.43.200:5100";
  }
  /****************************************************
  * properties
 *****************************************************/
  private urlBase: string;
  private getAllApiUrl: any = (page: number, tag: string, source: any,search:string) => { return this.urlBase + `/api/manga/GetAll?page=${page}&tag=${tag}&source=${source}&filter=${search}`; };
  private getByIdApiUrl: any = (mangaId: any, source: any) => { return this.urlBase + `/api/manga/GetById?source=${source}&mangaId=${mangaId}`; };
  private getMangaListHasNewChapterApiUrl: any = (count: any, source: any) => { return this.urlBase + `/api/manga/GetMangaListHasNewChapter?count=${count}&source=${source}`; };//string="/api/manga/GetMangaListHasNewChapter/";
  private getMostViewedApiUrl: any = (count: any, source: any) => { return this.urlBase + `/api/manga/GetMostViewed?count=${count}&source=${source}`; };
  private getForYouListApiUrl: any = (count: any, source: any) => { return this.urlBase + `/api/manga/GetForYouList?count=${count}&source=${source}`; };
  /****************************************************
  * Public methodes
 *****************************************************/
  public getAll(page: number = 1, tag: string = "", source: any,search:string) {
    return this._http.get<Array<MangaDetails>>(this.getAllApiUrl(page, tag, source,search));
  }

  public getById(id: string, source: any) {
    return this._http.get<MangaDetails>(this.getByIdApiUrl(id, source));
  }

  public getForYouList(count: any, tags: Array<string>, source: any) {
    let params = new HttpParams().set("count", count);
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      params = params.set("tags[" + index + "]", element);
    }
    return this._http.get<Array<MangaDetails>>(this.getForYouListApiUrl(count, source), { params: params });
  }

  public getMangaListHasNewChapter(count: number, source: any) {
    return this._http.get<Array<MangaDetails>>(this.getMangaListHasNewChapterApiUrl(count, source));
  }
  public getMostViewed(count: number, source: any) {
    return this._http.get<Array<MangaDetails>>(this.getMostViewedApiUrl(count, source));
  }

  public getMangaSources() {
    return this._http.get<Array<SourceViewModel>>(this.urlBase + "/api/manga/getSources");
  }

  public currentMangaSource(): SourceViewModel {
    return JSON.parse(localStorage.getItem("mangaSource"));
  }

}
