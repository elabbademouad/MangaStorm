import { Component,Input } from '@angular/core';
import { MangaItemModel} from '../../Model/MangaItemModel'
import { RessourcesProvider} from '../../providers/ressources/ressources'
@Component({
  selector: 'manga-details',
  templateUrl: 'manga-details.html'
})
export class MangaDetailsComponent {
 
 
  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _ressources:RessourcesProvider) {
    this.init();
  }
  /***************************************************
  * Initialize component
  ****************************************************/ 
  init(){
    this.ressources=this._ressources.stringResources;
  }
   /****************************************************
   * Public properties
  *****************************************************/
  @Input() item : MangaItemModel;
  ressources:any
}
