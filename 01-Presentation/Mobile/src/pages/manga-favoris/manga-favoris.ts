import {  Component} from '@angular/core';
import {  NavController,  NavParams} from 'ionic-angular';
import {  RessourcesProvider} from '../../providers/ressources/ressources';
import {  LoadingController} from 'ionic-angular'
import {  DataBaseProvider} from '../../providers/data-base/data-base';
import {  MangaDetailsViewModel} from '../../ViewModel/manga-details-View-model';
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
    public _ressources: RessourcesProvider,
    public _loading: LoadingController,
    public _dataBase: DataBaseProvider) {
    this.int();
  }
  /***************************************************
   * Initialize component
   ****************************************************/
  int() {
    this.ressources = this._ressources.stringResources;
    this.favoriteManga = new Array < MangaDetailsViewModel > ();
    this.getFavoriteManga();
  }

  /****************************************************
   * Public properties
   *****************************************************/
  ressources: any;
  favoriteManga: Array < MangaDetailsViewModel > ;
  /***************************************************
   * action and private methode
   ****************************************************/
  private getFavoriteManga() {
    this._dataBase.getFavoriteManga()
      .then((data) => {
        for (let i = 0; i < data.rows.length; i++) {
          const element = data.rows.item(i);
          this.favoriteManga.push({
            item: {
              id: element.Id,
              name: element.Name,
              date: element.Date,
              countChapters: element.ChapterCount,
              resume: element.Resume,
              cover: element.Cover,
              state: element.State,
              tags: element.Tags,
            },
            isFavorite: eval(element.IsFavorite),
            isDownloaded: eval(element.IsDownloaded),
          });
        }
      })
  }

}
