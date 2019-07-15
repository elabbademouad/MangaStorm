import { Component } from "@angular/core";
import { RessourcesProvider } from "../../providers/ressources/ressources";
import { Recent } from "../../ViewModel/recent";
import { Chapter } from "../../Model/chapter-model";
import { ChapterViewModel } from "../../ViewModel/chapter-view-model";
import { MangaPagePage } from "../manga-page/manga-page";
import { NavController } from "ionic-angular";
import { AppStorageProvider } from "../../providers/app-storage/app-storage";

@Component({
    selector: 'recents-page',
    templateUrl: 'recents-page.html'
})
export class RecentsPage {
    resources:any;
    recents:Array<Recent>=[];
    constructor(public _ressources:RessourcesProvider,
                public navCtrl: NavController,
                public _storage:AppStorageProvider){
        this.init();
    }

    init(){
        this.resources=this._ressources.stringResources;
        this._storage.getRecentsRead((items:Array<Recent>)=>{
          this.recents=items.reverse();
        });
    }

    handlClickOpenChapter(recent:Recent){
        let chapter:Chapter=new Chapter();
        chapter.id=recent.chapterId;
        chapter.title=recent.chapterName;
        chapter.number=recent.chapterNumber;
        chapter.mangaId=recent.mangaId;
        this._storage.setChapterAsRead(chapter,recent.mangaName)
        let chapterVm:ChapterViewModel=new ChapterViewModel();  
        chapterVm.chapter=chapter;
        this.navCtrl.push(MangaPagePage, {chapter:chapterVm,mangaName:recent.mangaName,source:recent.source.id,offline:false});
    }
}