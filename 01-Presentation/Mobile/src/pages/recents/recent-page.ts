import { Component } from "@angular/core";
import { RessourcesProvider } from "../../providers/ressources/ressources";
import { Recent } from "../../ViewModel/recent";
import { DataBaseProvider } from "../../providers/data-base/data-base";
import { Chapter } from "../../Model/chapter-model";
import { ChapterViewModel } from "../../ViewModel/chapter-view-model";
import { MangaPagePage } from "../manga-page/manga-page";
import { NavController } from "ionic-angular";

@Component({
    selector: 'recents-page',
    templateUrl: 'recents-page.html'
})
export class RecentsPage {
    resources:any;
    recents:Array<Recent>=[];
    constructor(public _ressources:RessourcesProvider,
                public _dataBase:DataBaseProvider,
                public navCtrl: NavController){
        this.init();
    }

    init(){
        this.resources=this._ressources.stringResources;
        this._dataBase.getRecentsRead()
          .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
              let element = data.rows.item(i);
              let recent:Recent=new Recent();
              recent.mangaName=element.MangaName;
              recent.date=new Date(element.Date);
              recent.chapterId=element.ChapterId;
              recent.mangaId=element.MangaId;
              recent.chapterName=element.ChapterName;
              recent.chapterNumber=element.ChapterNumber;
              this.recents.push(recent);
            }
            this.recents=this.recents.reverse(); 
          })
    }

    handlClickOpenChapter(recent:Recent){
        let chapter:Chapter=new Chapter();
        chapter.id=recent.chapterId;
        chapter.title=recent.chapterName;
        chapter.number=recent.chapterNumber;
        chapter.mangaId=recent.mangaId;
        this._dataBase.setChapterAsRead(chapter,recent.mangaName);
        let chapterVm:ChapterViewModel=new ChapterViewModel();  
        chapterVm.chapter=chapter;
        this.navCtrl.push(MangaPagePage, chapterVm);
    }
}