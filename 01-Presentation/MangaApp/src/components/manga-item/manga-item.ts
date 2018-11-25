import { Component, Input } from '@angular/core';
import {MangaItemModel} from "../../Model/MangaItemModel"
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { DataBaseProvider} from '../../providers/data-base/data-base';
import {MangaDetailsPage } from '../../pages/manga-details/manga-details';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'manga-item',
  templateUrl: 'manga-item.html'
})

export class MangaItemComponent {
  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _ressources:RessourcesProvider,
              public _databaseProvider:DataBaseProvider,
              public navCtrl:NavController) {
   this.init();
  }
  /****************************************************
   * Public properties
  *****************************************************/
  @Input() item : MangaItemModel;
  ressources : any;
  /***************************************************
  * Initialize component
  ****************************************************/ 
  init(){
    this.ressources=this._ressources.stringResources;
  }
 /***************************************************
  * UI event handler 
  ****************************************************/ 
  handleClickRead(mangaItem:MangaItemModel){
    this.navCtrl.push(MangaDetailsPage,mangaItem);
  }
  handleClickFavorie(mangaItem:MangaItemModel){
    mangaItem.isFavorite=!mangaItem.isFavorite;
    this._databaseProvider.addOrRemoveMangaFromFavorie(mangaItem);
  }
}