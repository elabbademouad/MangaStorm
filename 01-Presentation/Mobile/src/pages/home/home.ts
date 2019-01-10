import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ressources:any;
  constructor(public navCtrl: NavController,public _ressources:RessourcesProvider) {
        this.init();
  }
  tab1 :any
  init(){
    this.ressources=this._ressources.stringResources;   
  }

}


















