import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { LoadingController } from 'ionic-angular';
import { DataBaseProvider } from '../../providers/data-base/data-base'
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { MangaController } from '../../providers/controllers/manga-Controller';
import { TagController } from '../../providers/controllers/tag-controller';
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
    public _loadingCtrl: LoadingController,
    public _database: DataBaseProvider) {
    this.ressources = this._ressources.stringResources;
  }
  /***************************************************
  * Initialize component
  ****************************************************/
  init() {
    this.mangaList = [];
    this.mangaListFiltred = [];
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
  mangaList: Array<MangaDetailsViewModel>;
  ressources: any;
  filtreCardIsVisible: boolean
  tags: Array<{ tag: any, selected: any }>
  searchInput: string;
  mangaListFiltred: Array<MangaDetailsViewModel>;
  isLoaded: boolean
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
    let selectedTags = this.tags.filter((t) => {
      return t.selected
    });
    this.mangaListFiltred = this.mangaList.filter((m) => {
      let searchResult = false;
      let tagsResult = false;
      for (let index = 0; index < selectedTags.length; index++) {
        if (m.item.tags.includes(selectedTags[index].tag)) {
          tagsResult = true;
        }
      }
      if (selectedTags.length === 0) {
        tagsResult = true;
      }
      if (search === undefined || m.item.name.toLowerCase().includes(search.toLowerCase())) {
        searchResult = true;
      }
      return searchResult && tagsResult
    })
  }
  /**************************************************
   * Services Handler
   * ************************************************/
  GetMangaListService() {
    let loading = this._loadingCtrl.create({
      content: this.ressources.loading
    });
    loading.present();
    this._mangaCtr.getAll()
      .subscribe((data) => {
        data.forEach(element => {
          this.mangaList.push({
            isDownloaded:false,
            isFavorite:false,
            item:element
          })
        });
        this._database.setFavorieOrDownlodedManga(this.mangaList, () => {
          this.actionFiltreMangas(this.searchInput);
        });

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
      });
  }
}































