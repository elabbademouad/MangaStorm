import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
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
              public _mangaCtrl:MangaController,
              public _loadingCtrl: LoadingController,) {
    this.init();
  }

  forYouList:Array<MangaDetails>;
  lastChapterList:Array<MangaDetails>;
  mostViewedList:Array<MangaDetails>;
  
  lastChapterTitle:string;
  mostViewedTitle:string;
  forYouTitle:string;
  cp:number=0;

  init(){
    this.ressources=this._ressources.stringResources;
    // Set title from resources
    this.lastChapterTitle=this.ressources.lastChapterTitle;
    this.mostViewedTitle=this.ressources.mostViewedTitle;
    this.forYouTitle=this.ressources.forYouTitle;
    const loading=this._loadingCtrl.create({content: this.ressources.loading});
    loading.present();
    this._mangaCtrl.getMangaListHasNewChapter(12)
      .subscribe((data: MangaDetails[])=>{
        this.lastChapterList=data;
        this.cp++;
        if(this.cp==3){
          loading.dismiss();
        }
    })
    this._mangaCtrl.getForYouList(6,[])
      .subscribe((data: MangaDetails[])=>{
        this.forYouList=data;
        this.cp++;
        if(this.cp==3){
          loading.dismiss();
        }
    })
    this._mangaCtrl.getMostViewed(9)
      .subscribe((data: MangaDetails[])=>{
        this.mostViewedList=data;
        this.cp++;
        if(this.cp==3){
          loading.dismiss();
        }
    })
  }



}


















