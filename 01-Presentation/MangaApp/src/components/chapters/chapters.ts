import { Component } from '@angular/core';

/**
 * Generated class for the ChaptersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chapters',
  templateUrl: 'chapters.html'
})
export class ChaptersComponent {

  text: string;

  constructor() {
    console.log('Hello ChaptersComponent Component');
    this.text = 'Hello World';
  }

}
