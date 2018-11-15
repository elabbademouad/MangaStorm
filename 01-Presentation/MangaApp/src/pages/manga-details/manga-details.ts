import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MangaItemModel } from '../../Model/MangaItemModel';
import { RessourcesProvider} from '../../providers/ressources/ressources'
@Component({
  selector: 'page-manga-details',
  templateUrl: 'manga-details.html',
})
export class MangaDetailsPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController, public navParams: NavParams,public _ressources:RessourcesProvider) {
    this.int();
  }
 /***************************************************
  * Initialize component
  ****************************************************/ 
  int(){
    this.mangaItem=this.navParams.data;
    this.ressources=this._ressources.stringResources;
  }

  /****************************************************
   * Public properties
  *****************************************************/
  
  mangaItem:MangaItemModel;
  ressources:any

}
