import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { MangaPagePage } from '../../pages/manga-page/manga-page';
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { ChapterViewModel } from '../../ViewModel/chapter-view-model';
import { MangaController } from '../../providers/controllers/manga-Controller';
import { ChapterController } from '../../providers/controllers/chapter-Controller';
import { AppStorageProvider } from '../../providers/app-storage/app-storage';
import { Recent } from '../../ViewModel/recent';
import { DownloadProvider } from '../../providers/download/download';
import { DownloadState } from '../../Model/donwload-state-model';
import { DownloadStateEnum } from '../../enums/download-state-enum';
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
    public _mangaCtr: MangaController,
    public _chapterCtr: ChapterController,
    public _ressources: RessourcesProvider,
    public _storage: AppStorageProvider,
    public _downloadService: DownloadProvider,
    public _toastCtrl: ToastController) {
    this.downloadManga = this.navParams.data;
    if (this.navParams.data.manga != undefined) {
      this.downloadManga = this.navParams.data;
      this.offline = true;
      this.initOffline();
    } else {
      this.initOnline();
    }

  }
  /***************************************************
   * Initialize component
   ****************************************************/
  initOnline() {
    this.mangaItem = this.navParams.data;
    this.chapters = [];
    this.ressources = this._ressources.stringResources;

    this.loaded = 0;
    this._mangaCtr.getById(this.mangaItem.item.id, this.mangaItem.item.source.id)
      .subscribe((data) => {
        this.mangaItem.item = data;
        this.loaded++;
      })
    this._chapterCtr.getByMangaId(this.mangaItem.item.id, this.mangaItem.item.source.id)
      .subscribe((data) => {
        data.forEach((c) => {
          this.chapters.push({
            chapter: c,
            read: false,
            selected: false
          })
        });
        this._storage.getReadMangaChapters(this.mangaItem.item.id, (data: Array<Recent>) => {
          let readChapters = [];
          for (let i = 0; i < data.length; i++) {
            readChapters.push(data[i].chapterId);
          }
          this.chapters.forEach(c => {
            c.read = readChapters.findIndex(r => r == c.chapter.id) !== -1;
          })
        });
        this.loaded++
      })
  }
  initOffline() {
    this.downloadManga = this.navParams.data;
    this.mangaItem = this.downloadManga.manga;
    this.chapters = [];
    this.ressources = this._ressources.stringResources;

    this.loaded = 0;
    this.downloadManga.chapters.forEach((c) => {
      if (c.state == DownloadStateEnum.done) {
        this.chapters.push(c.chapter);
      }
    });
    this.chapters.sort((a, b) => {
      if (a.chapter.number >= b.chapter.number) {
        return 1;
      } else if (a.chapter.number <= b.chapter.number) {
        return -1;
      } else {
        return 0;
      }
    })
    this._storage.getReadMangaChapters(this.mangaItem.item.id, (data: Array<Recent>) => {
      let readChapters = [];
      for (let i = 0; i < data.length; i++) {
        readChapters.push(data[i].chapterId);
      }
      this.chapters.forEach(c => {
        c.read = readChapters.findIndex(r => r == c.chapter.id) !== -1;
      })
      this.loaded = 2;
    });
  }
  /****************************************************
   * Public properties
  *****************************************************/
  downloadManga: DownloadState;
  mangaItem: MangaDetailsViewModel = new MangaDetailsViewModel();
  ressources: any;
  chapters: Array<ChapterViewModel>;
  offline: boolean = false;
  loaded: number = 0;
  /****************************************************
   * UI event handler 
  *****************************************************/
  handleClickChapter(chapterVm: ChapterViewModel) {
    this._storage.setChapterAsRead(chapterVm.chapter, this.mangaItem.item.name);
    chapterVm.read = true;

    this.navCtrl.push(MangaPagePage, { chapter: chapterVm, mangaName: this.mangaItem.item.name, source: this.mangaItem.item.source.id, offline: this.offline });
  }
  handleClickDownloadChapter(chapter: ChapterViewModel) {
    this._downloadService.getDownloadChaptersId(this.mangaItem.item.id, (items: Array<string>) => {
      if (items.indexOf(chapter.chapter.id) == -1) {
        this._downloadService.download(this.mangaItem, [chapter]);
      } else {
        let toast = this._toastCtrl.create({
          message: 'الفصل محمل سابقا',
          duration: 4000,
          cssClass: "toast"
        });
        toast.present();
      }
    });
  }

}
