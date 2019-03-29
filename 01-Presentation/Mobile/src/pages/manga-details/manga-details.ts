import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { MangaPagePage } from '../../pages/manga-page/manga-page';
import { LoadingController } from 'ionic-angular'
import { DataBaseProvider } from '../../providers/data-base/data-base'
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { ChapterViewModel } from '../../ViewModel/chapter-view-model';
import { MangaController } from '../../providers/controllers/manga-Controller';
import { ChapterController } from '../../providers/controllers/chapter-Controller';
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
    public _mangaCtr:MangaController,
    public _chapterCtr:ChapterController,
    public _ressources: RessourcesProvider,
    public _loading: LoadingController,
    public _database: DataBaseProvider) {
    this.int();
  }
  /***************************************************
   * Initialize component
   ****************************************************/
  int() {
    this.mangaItem = this.navParams.data;
    this.chapters = [];
    this.readChapters = [];
    this.ressources = this._ressources.stringResources;

    let loading = this._loading.create({
      content: this.ressources.loading
    });
    loading.present();
    this._chapterCtr.getByMangaId(this.mangaItem.item.id)
      .subscribe((data) => {
        data.forEach((c) => {
          this.chapters.push({
            chapter:c,
            read:false
          })
        })
        this._database.getReadMangaChapters(this.mangaItem.item.name)
          .then((data) => {
            for (let i = 0; i < data.rows.length; i++) {
              let element = data.rows.item(i);
              this.readChapters.push(element.ChapterNumber.toString());
            }
            this.chapters.forEach(c => {
              c.read = this.readChapters.findIndex(r => r == c.chapter.number) !== -1;
            })
          })
        loading.dismiss();
      }, (errr) => {
        loading.dismiss();
      })
  }
  /****************************************************
   * Public properties
  *****************************************************/
  mangaItem: MangaDetailsViewModel;
  ressources: any;
  chapters: Array<ChapterViewModel>;
  readChapters: Array<string>;
  /****************************************************
   * UI event handler 
  *****************************************************/
  handleClickChapter(chapterVm: ChapterViewModel) {
    this._database.setChapterAsRead(chapterVm.chapter,this.mangaItem.item.name);
    chapterVm.read = true;
    this.navCtrl.push(MangaPagePage, chapterVm);
  }
}
