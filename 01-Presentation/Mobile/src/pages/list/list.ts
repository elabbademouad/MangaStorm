import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { LoadingController } from 'ionic-angular';
import { MangaController } from '../../providers/controllers/manga-Controller';
import { TagController } from '../../providers/controllers/tag-controller';
import { MangaDetails } from '../../Model/manga-details-model';
import { MangaDetailsPage } from '../manga-details/manga-details';
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
    public _mangaCtr: MangaController,
    public _tagCtr: TagController,
    public _ressources: RessourcesProvider,
    public _loadingCtrl: LoadingController) {
    this.ressources = this._ressources.stringResources;
  }
  /***************************************************
  * Initialize component
  ****************************************************/
  init() {
    this.mangaList = [];
    this.tags = [];
    this.searchInput = "";
    this.ressources = this._ressources.stringResources;
    this.GetMangaListService();
    this.GetTagsService();
  }
  ionViewDidLoad() {
    this.init();
  }
  /****************************************************
   * Public properties
  *****************************************************/
  mangaList: Array<MangaDetails>;
  ressources: any;
  filtreCardIsVisible: boolean
  tags: Array<{ tag: any, selected: any }>
  searchInput: string;
  page:number=1;
  /***************************************************
  * UI event handler 
  ****************************************************/
  handleFiltreClick() {
    this.filtreCardIsVisible = !this.filtreCardIsVisible;
  }

  handleSelectTagClick(tag: { tag: any, selected: any }) {
    tag.selected = !tag.selected;
    this.actionFiltreMangas(this.searchInput);
  }

  handleSearchChange(ev: any) {
    this.searchInput = ev.target.value
    this.actionFiltreMangas(this.searchInput);
  }
  handleSaerchClear() {
    this.searchInput = "";
    this.actionFiltreMangas(this.searchInput);
  }

  /***************************************************
   * action and private methode
  ****************************************************/
  actionFiltreMangas(search: string) {
  }
  /**************************************************
   * Services Handler
   * ************************************************/
  GetMangaListService() {
    let loading = this._loadingCtrl.create({
      content: this.ressources.loading
    });
    loading.present();
    this._mangaCtr.getAll(this.page)
      .subscribe((data) => {
        this.mangaList=data;
        loading.dismiss();
      }, (errr) => {
        loading.dismiss();
      });
  }
  GetTagsService() {
    this._tagCtr.getAll()
      .subscribe((data) => {
        this.tags = [];
        for (let index = 0; index < data.length; index++) {
          this.tags.push({ 'tag': data[index], 'selected': false });
        }
        this.page++;
      });
  }

  handleClickRead(item:MangaDetails){
    let mangaVm:MangaDetailsViewModel=new MangaDetailsViewModel();
    mangaVm.item=item;
    mangaVm.isDownloaded=false;
    mangaVm.isFavorite=false;
    this.navCtrl.push(MangaDetailsPage,mangaVm);
  }
  logScrollEnd(infiniteScroll:any){
    this._mangaCtr.getAll(this.page)
      .subscribe((data) => {
        data.forEach((m)=>{
          this.mangaList.push(m);
        });
        this.page++;
        infiniteScroll.complete();
      }, (errr) => {
        infiniteScroll.complete();
      });
  }
  logScrollEnd1(infiniteScroll:any){
    infiniteScroll.complete();
  }
}































