import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MangaItemModel } from '../../Model/MangaItemModel';
import { RessourcesProvider} from '../../providers/ressources/ressources'
import { MangaProvider } from '../../providers/manga/manga';
import { MangaPagePage} from '../../pages/manga-page/manga-page';
import {LoadingController} from 'ionic-angular'
import { DataBaseProvider } from '../../providers/data-base/data-base'
@Component({
  selector: 'manga-details',
  templateUrl: 'manga-details.html'
})
export class MangaDetailsPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _mangaProvider :MangaProvider,
              public _ressources:RessourcesProvider,
              public _loading:LoadingController,
              public _database:DataBaseProvider) {
    this.int();
  }
 /***************************************************
  * Initialize component
  ****************************************************/ 
  int(){
    this.mangaItem=this.navParams.data;
    this.chapters=[];
    this.readChapters=[];
    this.ressources=this._ressources.stringResources;
    
    let loading = this._loading.create({
      content: this.ressources.loading
    });
    loading.present();
    this._mangaProvider.GetChapters(this.mangaItem.matricule)
                       .subscribe((data:Array<any>)=>{
                         data.forEach((c)=>{
                            this.chapters.push({
                              id:c.id,
                              number:c.number,
                              read:false,
                              title:c.title
                            })
                         })
                         this._database.getReadMangaChapters(this.mangaItem.name)
                         .then((data)=>{
                          for (let i = 0; i < data.rows.length; i++) {
                            let element = data.rows.item(i);
                            this.readChapters.push(element.ChapterNumber.toString());
                          }
                          this.chapters.forEach(c=>{
                            c.read=this.readChapters.findIndex(r=> r == c.number) !== -1; 
                          }) 
                         })
                         loading.dismiss();
                       },(errr)=>{
                        loading.dismiss();
                      })
  }
  /****************************************************
   * Public properties
  *****************************************************/
  mangaItem:MangaItemModel;
  ressources:any;
  chapters:Array<{id : number,number:string,title:string,read:boolean}>;
  readChapters:Array<string>;
  /****************************************************
   * UI event handler 
  *****************************************************/
  handleClickChapter(chapter:any){
    this._database.setChapterAsRead(this.mangaItem.name,chapter.number,chapter.title);
    chapter.read=true;
    this.navCtrl.push(MangaPagePage,chapter);
  }
}
