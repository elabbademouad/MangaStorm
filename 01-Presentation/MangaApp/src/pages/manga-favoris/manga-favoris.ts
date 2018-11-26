import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider} from '../../providers/ressources/ressources'
import { MangaProvider } from '../../providers/manga/manga';
import {LoadingController} from 'ionic-angular'
import { MangaItemModel } from '../../Model/MangaItemModel';
import { DataBaseProvider} from '../../providers/data-base/data-base';
@Component({
  selector: 'manga-favoris',
  templateUrl: 'manga-favoris.html'
})
export class MangaFavorisPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _mangaProvider :MangaProvider,
              public _ressources:RessourcesProvider,
              public _loading:LoadingController,
              public _dataBase :DataBaseProvider) {
    this.int();
  }
 /***************************************************
  * Initialize component
  ****************************************************/ 
  int(){
    this.ressources=this._ressources.stringResources;
    this.favoriteManga=new Array<MangaItemModel>();
    this.getFavoriteManga();
  }

  /****************************************************
   * Public properties
  *****************************************************/
  ressources:any;
  favoriteManga:MangaItemModel[];
   /***************************************************
   * action and private methode
  ****************************************************/
  private getFavoriteManga(){
    this._dataBase.getFavoriteManga()
      .then((data)=>{
        for (let i = 0; i < data.rows.length; i++) {
          const element = data.rows.item(i);
          this.favoriteManga.push({
            name:element.Name,
            matricule:element.Matricule,
            date:element.Date,
            chapterCount:element.ChapterCount,
            resume:element.Resume,
            cover:element.Cover,
            state:element.State,
            tags:element.Tags,
            isFavorite:eval(element.IsFavorite),
            isDownloaded:eval(element.IsDownloaded),
            id:element.Id
          });
        }
      })
  }

}
