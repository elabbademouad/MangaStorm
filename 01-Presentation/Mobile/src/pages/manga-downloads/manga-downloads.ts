import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider} from '../../providers/ressources/ressources'
import { DownloadProvider } from '../../providers/download/download';
import { DownloadState } from '../../Model/donwload-state-model';
import { MangaDetailsPage } from '../manga-details/manga-details';
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
              public _downloadService:DownloadProvider) {
    this.int();
  }
  downloadsState:Array<DownloadState>;
  selectedScrenne:any='list';
 /***************************************************
  * Initialize component
  ****************************************************/ 
  int(){
    this.ressources=this._ressources.stringResources;
    this._downloadService.getLastState((data: DownloadState[])=>{
      this.downloadsState=data;
    });
    this._downloadService.getCurrentState()
    .subscribe({next:(data)=>{
      this.downloadsState=data;
    }})
  }

  handleClickManga(item:DownloadState){
    this.navCtrl.push(MangaDetailsPage,item);
  }
  
  /****************************************************
   * Public properties
  *****************************************************/
  ressources:any;

}
