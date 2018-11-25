import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider} from '../../providers/ressources/ressources'
import { MangaProvider } from '../../providers/manga/manga';
import {LoadingController} from 'ionic-angular'
@Component({
  selector: 'manga-page',
  templateUrl: 'manga-page.html'
})
export class MangaPagePage {

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
    this.chapter=this.navParams.data;
    this.ressources=this._ressources.stringResources;
    let loading = this._loading.create({
      content: this.ressources.loading
    });
    loading.present();
    this._mangaProvider.GetPagesByChapter(this.chapter.id)
                       .subscribe((data)=>{
                         this.pages=data;
                         loading.dismiss();                                                                                                                                                
                       })
  }

  /****************************************************
   * Public properties
  *****************************************************/
  ressources:any;
  chapter:any;
  pages:any

}
