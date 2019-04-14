import { Component, Input } from '@angular/core';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { DataBaseProvider} from '../../providers/data-base/data-base';
import { NavController } from 'ionic-angular';
import { SectionViewModel } from '../../ViewModel/section-view-model';
@Component({
  selector: 'manga-section',
  templateUrl: 'manga-section.html'
})

export class MangaSectionComponent {
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
  @Input()
  title:string="titile";
  @Input()
  items:SectionViewModel
  ressources : any;
  /***************************************************
  * Initialize component
  ****************************************************/ 
  init(){
    this.ressources=this._ressources.stringResources;
    this.title=this.ressources.lastUpdate;
  }
 /***************************************************
  * UI event handler 
  ****************************************************/ 
  
}