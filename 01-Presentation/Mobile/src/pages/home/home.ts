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
  lastUpdate:Array<MangaDetails>;
  lastUpdateTitle:string;
  lastChapterTitle:string;
  mostViewedTitle:string;
  forYouTitle:string;

  init(){
    this.ressources=this._ressources.stringResources;
    this.lastUpdateTitle=this.ressources.lastUpdate;
    this.lastChapterTitle=this.ressources.lastChapter;
    this.mostViewedTitle=this.ressources.mostViewed;
    this.forYouTitle=this.ressources.forYou;
    this._mangaCtrl.getAll()
      .subscribe((data: MangaDetails[])=>{
        this.lastUpdate=data;
      });
  }



}


















