import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider} from '../../providers/ressources/ressources'
import {LoadingController} from 'ionic-angular'
@Component({
  selector: 'manga-downloads',
  templateUrl: 'manga-downloads.html'
})
export class MangaDownloadsPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _ressources:RessourcesProvider,
              public _loading:LoadingController) {
    this.int();
  }
 /***************************************************
  * Initialize component
  ****************************************************/ 
  int(){
    this.ressources=this._ressources.stringResources;
  }

  /****************************************************
   * Public properties
  *****************************************************/
  ressources:any;

}
