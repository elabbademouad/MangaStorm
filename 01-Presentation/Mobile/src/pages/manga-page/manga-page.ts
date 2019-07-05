import {  Component} from '@angular/core';
import {  NavController,  NavParams} from 'ionic-angular';
import {  RessourcesProvider} from '../../providers/ressources/ressources'
import {  LoadingController} from 'ionic-angular'
import {  ChapterViewModel} from '../../ViewModel/chapter-view-model';
import {  PageController} from '../../providers/controllers/page-controller';
import {  Page} from '../../Model/page-model';
import {  ChapterController} from '../../providers/controllers/chapter-Controller';
import {  ListPage } from '../list/list';
import {  DomSanitizer } from '@angular/platform-browser';
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
    private sanitizer: DomSanitizer) {
    this.int();
  }
  /***************************************************
   * Initialize component
   ****************************************************/
  int() {
    this.chapterVm = this.navParams.data.chapter;
    this.managName = this.navParams.data.mangaName;
    this.ressources = this._ressources.stringResources;
    let loading = this._loading.create({
      content: this.ressources.loading
    });
    loading.present();
    this._pageCtr.getByChapterId(this.chapterVm.chapter.id)
      .subscribe((data) => {
        this.pages = data;
        this.currentPage=this.pages[this.index];
        loading.dismiss();

      })
    // this._chapterCtr.getNextChapter(this.chapterVm.chapter.mangaId, Number(this.chapterVm.chapter.number))
    //   .subscribe(data => {
    //     if (data !== null && data !== undefined) {
    //       this.disableNextChapter=false;
    //       this.nextChapterVm = new ChapterViewModel();
    //       this.nextChapterVm.chapter = data;
    //     }
    //   });
    // this._chapterCtr.getPreviousChapter(this.chapterVm.chapter.mangaId, Number(this.chapterVm.chapter.number))
    //   .subscribe(data => {
    //     if (data !== null && data !== undefined) {
    //       this.disablePreviousChapter=false;
    //       this.previousChapterVm = new ChapterViewModel();
    //       this.previousChapterVm.chapter = data;
    //     }
    //   })
  }

  handleClickNextChapter() {
    //this._database.setChapterAsRead(this.nextChapterVm.chapter,this.managName);
    this.nextChapterVm.read = true;
    this.navCtrl.push(MangaPagePage, {chapter:this.nextChapterVm,mangaName:this.managName});
  }
  handleClickPreviousChapter() {
    //this._database.setChapterAsRead(this.previousChapterVm.chapter,this.managName);
    this.previousChapterVm.read = true;
    this.navCtrl.push(MangaPagePage, {chapter:this.previousChapterVm,mangaName:this.managName});
  }
  handleClickHome(){
    this.navCtrl.setRoot(ListPage);
  }

  getImgContent(url="") {
    return  this.sanitizer.bypassSecurityTrustUrl(url);
  }

  swipeEvent(event:any){
    if(event.direction==4 && this.index<this.pages.length-1){
      this.index++;
    }else if(event.direction==2 && this.index>0){
      this.index--;
    }
    this.currentPage=this.pages[this.index]
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
  index:number=0;
  currentPage:Page;
}
