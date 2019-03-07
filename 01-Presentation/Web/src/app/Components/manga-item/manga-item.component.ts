import { Component, OnInit, Input } from '@angular/core';
import { MangaDetails } from 'src/Model/manga-details-model';

@Component({
  selector: 'app-manga-item',
  templateUrl: './manga-item.component.html',
  styleUrls: ['./manga-item.component.css']
})
export class MangaItemComponent implements OnInit {

  
  constructor() { 
  }
  @Input()
  item:MangaDetails
  ngOnInit() {
  }

}
