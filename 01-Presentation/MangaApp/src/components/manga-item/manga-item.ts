import { Component, Input } from '@angular/core';
import {MangaItemModel} from "../../Model/MangaItemModel"
import {stringRessources} from '../../ressources/stringRessources';
@Component({
  selector: 'manga-item',
  templateUrl: 'manga-item.html'
})

export class MangaItemComponent {

  @Input() item : MangaItemModel;
  ressources : object;
  constructor() {     
    this.ressources=new stringRessources();
  }

}