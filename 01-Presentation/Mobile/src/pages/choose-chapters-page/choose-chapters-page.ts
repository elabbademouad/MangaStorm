import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { LoadingController } from 'ionic-angular'
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { ChapterViewModel } from '../../ViewModel/chapter-view-model';
import { ChapterController } from '../../providers/controllers/chapter-Controller';
import { DownloadProvider } from '../../providers/download/download';
@Component({
  selector: 'choose-chapters-page',
  templateUrl: 'choose-chapters-page.html'
})
export class ChooseChaptersPage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _chapterCtr: ChapterController,
    public _ressources: RessourcesProvider,
    public _loading: LoadingController,
    public _downloadService: DownloadProvider) {
    this.int();
  }
  /***************************************************
   * Initialize component
   ****************************************************/
  int() {
    this.mangaItem = this.navParams.data;
    this.chapters = [];
    this.ressources = this._ressources.stringResources;

    let loading = this._loading.create({
      content: this.ressources.loading,
    });
    loading.present();
    this._chapterCtr.getByMangaId(this.mangaItem.item.id, this.mangaItem.item.source.id)
      .subscribe((data) => {
        this._downloadService.getDownloadChaptersId(this.mangaItem.item.id, ((items: Array<string>) => {
          data.forEach((c) => {
            if (items.indexOf(c.id) == -1) {
              this.chapters.push({
                chapter: c,
                read: false
              })
            }
          });
          loading.dismiss();
        }))
      }, (errr) => {
        loading.dismiss();
      })
  }
  /****************************************************
   * Public properties
  *****************************************************/
  mangaItem: MangaDetailsViewModel = new MangaDetailsViewModel();
  ressources: any;
  chapters: Array<ChapterViewModel>;
  selectAll: boolean = true;
  get selectedChaprersCount(): number {
    return this.chapters.filter(c => c.selected).length;
  }
  /****************************************************
   * UI event handler 
  *****************************************************/
  handleClickSelectAll(chapterVm: ChapterViewModel) {
    this.chapters.forEach((c) => { c.selected = this.selectAll });
    this.selectAll = !this.selectAll;
  }

  handleClickDownload() {
    this._downloadService.download(this.mangaItem, this.chapters.filter(c => c.selected));
    this.navCtrl.pop();
  }
}
