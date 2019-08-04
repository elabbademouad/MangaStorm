import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chapter } from '../../Model/chapter-model';
import { ChapterDownload } from '../../Model/chapter-download-model';
import { Page } from 'ionic-angular/navigation/nav-util';
@Injectable()
export class ChapterController {

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
    urlBase: string;
    getChaptersByMangaIdApiUrl: any = (mangaId: any, source: any) => { return this.urlBase + `/api/chapter/GetChaptersByMangaId?source=${source}&mangaId=${mangaId}`; };

    /****************************************************
    * Public methodes
   *****************************************************/
    public getByMangaId(mangaId: string, source: any) {
        return this._http.get<Array<Chapter>>(this.getChaptersByMangaIdApiUrl(mangaId, source));
    }

}
