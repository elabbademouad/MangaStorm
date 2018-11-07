import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MangaItemModel } from '../../Model/MangaItemModel';
@Component({
  selector: 'page-manga-details',
  templateUrl: 'manga-details.html',
})
export class MangaDetailsPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mangaItem=this.navParams.data;
  }

  /****************************************************
   * Public properties
  *****************************************************/
  mangaItem:MangaItemModel;

}
