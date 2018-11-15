import { Component, Input } from '@angular/core';
import {MangaItemModel} from "../../Model/MangaItemModel"
import { RessourcesProvider } from '../../providers/ressources/ressources'
@Component({
  selector: 'manga-item',
  templateUrl: 'manga-item.html'
})

export class MangaItemComponent {

  
  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _ressources:RessourcesProvider) {     
   this.init();
  }
  /****************************************************
   * Public properties
  *****************************************************/
  @Input() item : MangaItemModel;
  ressources : any;
  /***************************************************
  * Initialize component
  ****************************************************/ 
  init(){
    this.ressources=this._ressources.stringResources;
  }
}