import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { MangaDetails } from '../../Model/manga-details-model';
import { MangaController } from '../../providers/controllers/manga-Controller';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ressources:any;
  constructor(public navCtrl: NavController,
              public _ressources:RessourcesProvider,
              public _mangaCtrl:MangaController) {
    this.init();
  }

  newList:Array<MangaDetails>;
  forYouList:Array<MangaDetails>;
  lastChapterList:Array<MangaDetails>;
  mostViewedList:Array<MangaDetails>;
  
  newListTitle:string;
  lastChapterTitle:string;
  mostViewedTitle:string;
  forYouTitle:string;

  init(){
    this.ressources=this._ressources.stringResources;
    // Set title from resources
    this.newListTitle=this.ressources.newListTitle;
    this.lastChapterTitle=this.ressources.lastChapterTitle;
    this.mostViewedTitle=this.ressources.mostViewedTitle;
    this.forYouTitle=this.ressources.forYouTitle;
    
    this._mangaCtrl.getNewList(12)
      .subscribe((data: MangaDetails[])=>{
        this.newList=data;
    });
    this._mangaCtrl.getMangaListHasNewChapter(6)
      .subscribe((data: MangaDetails[])=>{
        this.lastChapterList=data;
    })
    this._mangaCtrl.getMangaListHasNewChapter(6)
      .subscribe((data: MangaDetails[])=>{
        this.lastChapterList=data;
    })
    this._mangaCtrl.getMostViewed(6)
      .subscribe((data: MangaDetails[])=>{
        this.mostViewedList=data;
    })
  }



}


















