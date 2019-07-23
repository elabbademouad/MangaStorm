import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rating-status',
  templateUrl: 'rating-status.html'
})
export class RatingStatusComponent implements OnInit{


  @Input()
  set rating(value:string){
    if(value!=null && value !=undefined){
      let stars=Number(value);
      this.stars= Math.floor(stars);
      this.starsRest=5-this.stars;
    }
  }
  stars:number=0;
  starsRest:number=0;
  constructor() {
    
  }
  ngOnInit(){
    
  }

}
