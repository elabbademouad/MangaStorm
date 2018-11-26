import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MangaItemModel } from '../../Model/MangaItemModel';
import { RessourcesProvider} from '../../providers/ressources/ressources'
import { MangaProvider } from '../../providers/manga/manga';
import { MangaPagePage} from '../../pages/manga-page/manga-page';
import {LoadingController} from 'ionic-angular'
@Component({
  selector: 'manga-details',
  templateUrl: 'manga-details.html'
})
export class MangaDetailsPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _mangaProvider :MangaProvider,
              public _ressources:RessourcesProvider,
              public _loading:LoadingController) {
    this.int();
  }
 /***************************************************
  * Initialize component
  ****************************************************/ 
  int(){
    this.mangaItem=this.navParams.data;
    this.ressources=this._ressources.stringResources;
    let loading = this._loading.create({
      content: this.ressources.loading
    });
    loading.present();
    this._mangaProvider.GetChapters(this.mangaItem.matricule)
                       .subscribe((data)=>{
                         this.chapters=data;
                         loading.dismiss();
                       },(errr)=>{
                        loading.dismiss();
                      })
  }
  /****************************************************
   * Public properties
  *****************************************************/
  mangaItem:MangaItemModel;
  ressources:any;
  chapters:any

  /****************************************************
   * UI event handler 
  *****************************************************/
  handleClickChapter(chapter:any){
    this.navCtrl.push(MangaPagePage,chapter);
  }
}
