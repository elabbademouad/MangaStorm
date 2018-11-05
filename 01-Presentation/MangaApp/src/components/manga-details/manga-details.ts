import { Component } from '@angular/core';
@Component({
  selector: 'manga-details',
  templateUrl: 'manga-details.html'
})
export class MangaDetailsComponent {

  text: string;

  constructor() {
    console.log('Hello MangaDetailsComponent Component');
    this.text = 'Hello World';
  }

}
