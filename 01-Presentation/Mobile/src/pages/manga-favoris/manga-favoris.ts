import {  Component, OnInit} from '@angular/core';
import {  NavController,  NavParams} from 'ionic-angular';
import {  RessourcesProvider} from '../../providers/ressources/ressources';
import {  LoadingController} from 'ionic-angular'
import {  DataBaseProvider} from '../../providers/data-base/data-base';
import { MangaDetails } from '../../Model/manga-details-model';
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
    public _loading: LoadingController,
    public _dataBase: DataBaseProvider) {
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
  ngOnInit(){
  }
  /****************************************************
   * Public properties
   *****************************************************/
  ressources: any;
  favoriteManga: Array <MangaDetails> ;
  /***************************************************
   * action and private methode
   ****************************************************/
  private getFavoriteManga() {
    this._dataBase.getFavoriteManga()
      .then((data) => {
        let result=new Array<MangaDetails>();
        for (let i = 0; i < data.rows.length; i++) {
          const element = data.rows.item(i);
          let manga=new MangaDetails();
              manga.id= element.Id;
              manga.name= element.Name;
              manga.date= element.Date;
              manga.countChapters= element.ChapterCount;
              manga.resume= element.Resume;
              manga.cover= element.Cover;
              manga.state= element.State;
              manga.tags= element.Tags;
              manga.views=0;
          result.push(manga);
            // isFavorite: eval(element.IsFavorite),
            // isDownloaded: eval(element.IsDownloaded),         
        }
        this.favoriteManga=result;             

      });
  }

}
