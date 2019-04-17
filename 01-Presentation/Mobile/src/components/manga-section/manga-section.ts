import { Component, Input } from '@angular/core';
import { DataBaseProvider} from '../../providers/data-base/data-base';
import { NavController } from 'ionic-angular';
import { SectionViewModel } from '../../ViewModel/section-view-model';
import { MangaDetails } from '../../Model/manga-details-model';
import { MangaDetailsPage } from '../../pages/manga-details/manga-details';
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
@Component({
  selector: 'manga-section',
  templateUrl: 'manga-section.html'
})

export class MangaSectionComponent {
  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _databaseProvider:DataBaseProvider,
              public navCtrl:NavController) {
   this.init();
  }
  /****************************************************
   * Public properties
  *****************************************************/
  @Input()
  title:string="Section title";
  @Input()
  range:number=3;
  @Input()
  set items(value:Array<MangaDetails>){
    if(value !==null && value!=undefined && value.length !==0){
      this.setViewItems(value);
    }
  }
  @Input()
  hasTitle:boolean=true;
  viewItems:Array<SectionViewModel>=[]
  /***************************************************
  * Initialize component
  ****************************************************/ 
  init(){
    
  }

 /***************************************************
  * UI event handler 
  ****************************************************/ 
  setViewItems(items:Array<MangaDetails>){
    let result:Array<SectionViewModel>=[];
    let slide:Array<MangaDetails>=[];
    let cp:number=0;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      slide.push(element);
      cp++;
      if( cp==this.range){
        result.push({items:slide});
        slide=[];
        cp=0;
      }
    }
    if(slide.length!==0){
      result.push({items:slide});
    }
    this.viewItems=result;    
  }
  handleClickRead(item:MangaDetails){
    let mangaVm:MangaDetailsViewModel=new MangaDetailsViewModel();
    mangaVm.item=item;
    mangaVm.isDownloaded=false;
    mangaVm.isFavorite=false;
    this.navCtrl.push(MangaDetailsPage,mangaVm);
  }
}