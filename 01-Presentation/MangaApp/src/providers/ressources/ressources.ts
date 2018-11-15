import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { getScrollData } from 'ionic-angular/umd/components/input/input';
@Injectable()
export class RessourcesProvider {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _http:HttpClient) {
    this.init();
    
  }

  /***************************************************
  * Initialize provider
  ****************************************************/ 
   init(){
    this.stringResources={
      "chapter" : "عدد الفصول :",
      "state" : "الحالة :",
      "dateEdition" : "سنة الإصدار :",
      "tags" : "التصنيفات :",
      "resume" : "نبذة عن القصة :",
      "name" : "الإسم :",
      "mangaList" : "قائمة  المانغا",
      "search" : "بحث",
      "home" : "الرئيسية",
      "chapters" : "الفصول",
      "infos" : "نبذة"
      };
  }
  /****************************************************
   * Public properties
  *****************************************************/
  stringResources:any
  
}
