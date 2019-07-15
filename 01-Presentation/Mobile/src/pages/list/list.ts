import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { LoadingController } from 'ionic-angular';
import { MangaController } from '../../providers/controllers/manga-Controller';
import { TagController } from '../../providers/controllers/tag-controller';
import { MangaDetails } from '../../Model/manga-details-model';
import { MangaDetailsPage } from '../manga-details/manga-details';
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { SourceList } from '../sources-list/sources-list';
import { SourceViewModel } from '../../ViewModel/source-view-model';
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
    this.source=this._mangaCtr.currentMangaSource();

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
  tags: Array<string>
  searchInput: string;
  page: number = 1;
  selectedTag: string=undefined;
  endList:boolean=false;
  source:SourceViewModel;
  /***************************************************
  * UI event handler 
  ****************************************************/
  handleFiltreClick() {
    this.filtreCardIsVisible = !this.filtreCardIsVisible;
  }

  handleSelectTagClick(tag: string) {
    if (this.selectedTag == tag) {
      this.selectedTag = undefined;
    } else {
      this.selectedTag = tag;
    }
    this.page = 1;
    this.endList=false;
    this.GetMangaListService();
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
    this._mangaCtr.getAll(this.page, this.selectedTag,this.source.source.id)
      .subscribe((data) => {
        this.mangaList = data;
        this.page++;
        loading.dismiss();
      }, (errr) => {
        loading.dismiss();
      });
  }
  GetTagsService() {
    this._tagCtr.getAll(this.source.source.id)
      .subscribe((data) => {
        this.tags = data;
      });
  }

  handleClickRead(item: MangaDetails) {
    let mangaVm: MangaDetailsViewModel = new MangaDetailsViewModel();
    mangaVm.item = item;
    mangaVm.isDownloaded = false;
    mangaVm.isFavorite = false;
    this.navCtrl.push(MangaDetailsPage, mangaVm);
  }
  logScrollEnd(infiniteScroll: any) {
    if(!this.endList){
      this._mangaCtr.getAll(this.page, this.selectedTag,this.source.source.id)
      .subscribe((data) => {
        if(data.length==0)
        {
          this.endList=true;
        }
        data.forEach((m) => {
          this.mangaList.push(m);
        });
        this.page++;
        infiniteScroll.complete();
      }, (errr) => {
        infiniteScroll.complete();
      });
    }else{
      infiniteScroll.complete();
    }
  }
  handleClickSourceClick(){
    this.navCtrl.push(SourceList);
  }
}































