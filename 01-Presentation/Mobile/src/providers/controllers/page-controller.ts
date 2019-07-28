import { HttpClient } from "@angular/common/http";
import { Page } from "../../Model/page-model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
@Injectable()
export class PageController {
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
        this.urlBase = "http://35.211.13.59:80";
        this.getByChapterIdApiUrl = (chapterId: string, source: any) => { return this.urlBase + `/api/page/GetPagesByChapterId?source=${source}&chapterId=${chapterId}` };
        this.downloadApiUrl = (url: string) => { return this.urlBase + `/api/page/DownloadImage?url=${url}` };
    }
    /****************************************************
    * properties
   *****************************************************/
    urlBase: string;
    getByChapterIdApiUrl: any;
    downloadApiUrl: any;
    downloadChapterApiUrl: any = (chapterId: any, source: any) => { return this.urlBase + `/api/page/DownloadChapter?source=${source}&chapterId=${chapterId}` };
    /****************************************************
    * Public methodes
   *****************************************************/
    public getByChapterId(chapterId: string, source: any) {
        return this._http.get<Array<Page>>(this.getByChapterIdApiUrl(chapterId, source));
    }
    public downloadImage(url: string): Observable<string> {
        return this._http.get<string>(this.downloadApiUrl(url), { responseType: 'text' as 'json' });
    }
    public downloadChapter(chapterId: string, source: any) {
        return this._http.get<Array<Page>>(this.downloadChapterApiUrl(chapterId, source));
    }
}
