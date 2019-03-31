import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-item',
  templateUrl: 'page-item.html'
})
export class PageItemComponent {

  @Input()
  url: string;
  className:string="";
  constructor() {
  }

  rotate(){
    if(this.className==="rotate"){
      this.className="";
    }else{
      this.className="rotate"
    }
  }
}
