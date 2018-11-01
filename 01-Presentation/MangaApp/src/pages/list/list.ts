import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MangaItemModel } from '../../Model/MangaItemModel';
import { stringRessources } from '../../ressources/stringRessources';
import { MangaProvider} from '../../providers/manga/manga'
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  
  mangaList : Array<MangaItemModel>;
  ressources: any;
  constructor(public navCtrl: NavController,_mangaProvider:MangaProvider) {
          this.ressources=new stringRessources();
          this.mangaList=_mangaProvider.GetData();
          
        
  }
}































