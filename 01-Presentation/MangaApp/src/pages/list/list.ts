import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MangaItemModel } from '../../Model/MangaItemModel';
import { stringRessources } from '../../ressources/stringRessources';
import { MangaProvider} from '../../providers/manga/manga'
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,public _mangaProvider:MangaProvider) {
    this.init();
  }


  /****************************************************
   * Public properties
  *****************************************************/
  mangaList : Array<MangaItemModel>;
  ressources: any;
  filtreCardIsVisible:boolean
  tags:Array<{tag:any,selected:any}>
  searchInput:string;
  mangaListFiltred : Array<MangaItemModel>;

  /***************************************************
  * Initialize component
  ****************************************************/ 
  init(){
    this.mangaList=[];
    this.mangaListFiltred=[];
    this.tags=[];
    this.searchInput="";
    this.ressources=new stringRessources();
    this.GetMangaListService();
    this.GetTagsService();    
  }
  /***************************************************
  * UI event handler 
  ****************************************************/ 
  handleFiltreClick() {
    this.filtreCardIsVisible=!this.filtreCardIsVisible;
  }

  handleSelectTagClick(tag:{tag:any,selected:any}){
      tag.selected=!tag.selected;
      this.actionFiltreMangas(this.searchInput);
  }

  handleSearchChange(ev:any){
      this.searchInput=ev.target.value
      this.actionFiltreMangas(this.searchInput);
  }
  /***************************************************
   * action and private methode
  ****************************************************/
  actionFiltreMangas(search:string){
      let selectedTags=this.tags.filter((t)=>{
          return t.selected
      });
      this.mangaListFiltred=this.mangaList.filter((m)=>{
          let searchResult=false;
          let tagsResult=false;
          for (let index = 0; index < selectedTags.length; index++) {
             if(m.tags.includes(selectedTags[index].tag)){
                tagsResult=true;
             }           
          }
          if(selectedTags.length===0)
          {
            tagsResult=true;
          }
          if(m.name.toLowerCase().includes(search.toLowerCase())){
            searchResult=true;
          }
          return  searchResult && tagsResult
      })
  }
  /**************************************************
   * Services Handler
   * ************************************************/
  GetMangaListService(){
    this._mangaProvider.GetMangaList()
    .subscribe((data : Array<MangaItemModel>) => {
      this.mangaList=data;
      this.actionFiltreMangas(this.searchInput); 
    });
  }
  GetTagsService(){
    this._mangaProvider.GetTags()
    .subscribe((data : Array<string>) => {
        this.tags=[];
        for (let index = 0; index < data.length; index++) {
          this.tags.push({'tag':data[index],'selected':false});
        }
    });
  }
}































