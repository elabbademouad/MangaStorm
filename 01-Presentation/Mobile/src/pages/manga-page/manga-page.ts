import {  Component} from '@angular/core';
import {  NavController,  NavParams} from 'ionic-angular';
import {  RessourcesProvider} from '../../providers/ressources/ressources'
import {  LoadingController} from 'ionic-angular'
import {  ChapterViewModel} from '../../ViewModel/chapter-view-model';
import {  PageController} from '../../providers/controllers/page-controller';
import {  Page} from '../../Model/page-model';
import {  ChapterController} from '../../providers/controllers/chapter-Controller';
import { ListPage } from '../list/list';
import { DataBaseProvider } from '../../providers/data-base/data-base';
@Component({
  selector: 'manga-page',
  templateUrl: 'manga-page.html'
})
export class MangaPagePage {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public _pageCtr: PageController,
    public _ressources: RessourcesProvider,
    public _loading: LoadingController,
    public _chapterCtr: ChapterController,
    public _database:DataBaseProvider) {
    this.int();
  }
  /***************************************************
   * Initialize component
   ****************************************************/
  int() {
    this.chapterVm = this.navParams.data.chapter;
    this.managName = this.navParams.data.managName;
    this.ressources = this._ressources.stringResources;
    let loading = this._loading.create({
      content: this.ressources.loading
    });
    loading.present();
    this._pageCtr.getByChapterId(this.chapterVm.chapter.id)
      .subscribe((data) => {
        this.pages = data;
        loading.dismiss();

      })
    this._chapterCtr.getNextChapter(this.chapterVm.chapter.mangaId, Number(this.chapterVm.chapter.number))
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.disableNextChapter=false;
          this.nextChapterVm = new ChapterViewModel();
          this.nextChapterVm.chapter = data;
        }
      });
    this._chapterCtr.getPreviousChapter(this.chapterVm.chapter.mangaId, Number(this.chapterVm.chapter.number))
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.disablePreviousChapter=false;
          this.previousChapterVm = new ChapterViewModel();
          this.previousChapterVm.chapter = data;
        }
      })
  }

  handleClickNextChapter() {
    this._database.setChapterAsRead(this.nextChapterVm.chapter,this.managName);
    this.nextChapterVm.read = true;
    this.navCtrl.push(MangaPagePage, this.nextChapterVm);
  }
  handleClickPreviousChapter() {
    this._database.setChapterAsRead(this.previousChapterVm.chapter,this.managName);
    this.previousChapterVm.read = true;
    this.navCtrl.push(MangaPagePage, this.previousChapterVm);
  }
  handleClickHome(){
    this.navCtrl.setRoot(ListPage);
  }
  /****************************************************
   * Public properties
   *****************************************************/
  ressources: any;
  managName:string;
  chapterVm: ChapterViewModel;
  nextChapterVm: ChapterViewModel;
  previousChapterVm: ChapterViewModel;
  pages: Array < Page >
  disableNextChapter:boolean=true;
  disablePreviousChapter:boolean=true;
}
