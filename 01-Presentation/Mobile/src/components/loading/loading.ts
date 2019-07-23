import { Component } from '@angular/core';
import { RessourcesProvider } from '../../providers/ressources/ressources'
@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})

export class LoadingComponent {
  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _ressources: RessourcesProvider) {
    this.init();
  }
  /****************************************************
   * Public properties
  *****************************************************/
  ressources: any;
  /***************************************************
  * Initialize component
  ****************************************************/
  init() {
    this.ressources = this._ressources.stringResources;
  }
  /***************************************************
   * UI event handler 
   ****************************************************/
  
}