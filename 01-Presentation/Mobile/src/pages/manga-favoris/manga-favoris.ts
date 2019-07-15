import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources';
import { MangaDetails } from '../../Model/manga-details-model';
import { AppStorageProvider } from '../../providers/app-storage/app-storage';
@Component({
  selector: 'manga-favoris',
  templateUrl: 'manga-favoris.html'
})
export class MangaFavorisPage implements OnInit {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _ressources: RessourcesProvider,
    public _storage: AppStorageProvider) {
    this.int();
  }
  /***************************************************
   * Initialize component
   ****************************************************/
  int() {
    this.ressources = this._ressources.stringResources;
    this.favoriteManga = [];
    this.getFavoriteManga();
  }
  ngOnInit() {
  }
  /****************************************************
   * Public properties
   *****************************************************/
  ressources: any;
  favoriteManga: Array<MangaDetails>;
  /***************************************************
   * action and private methode
   ****************************************************/
  private getFavoriteManga() {
    this._storage.getFavoriteManga((data: Array<MangaDetails>) => {
      this.favoriteManga = data;
    });
  }

}
