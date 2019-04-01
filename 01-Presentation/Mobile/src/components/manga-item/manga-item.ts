import { Component, Input } from '@angular/core';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { DataBaseProvider} from '../../providers/data-base/data-base';
import { MangaDetailsPage } from '../../pages/manga-details/manga-details';
import { NavController } from 'ionic-angular';
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
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
  @Input() item : MangaDetailsViewModel;
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
  handleClickRead(){
    this.navCtrl.push(MangaDetailsPage,this.item);
  }
  handleClickFavorie(){
    this.item.isFavorite=!this.item.isFavorite;
    this._databaseProvider.addOrRemoveMangaFromFavorie(this.item);
  }
}