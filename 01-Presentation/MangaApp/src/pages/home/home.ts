import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {stringRessources } from '../../ressources/stringRessources'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ressources:stringRessources;
  constructor(public navCtrl: NavController) {
        this.ressources=new stringRessources();
  }

}


















