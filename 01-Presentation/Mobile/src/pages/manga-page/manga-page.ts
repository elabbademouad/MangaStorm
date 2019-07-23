import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RessourcesProvider } from '../../providers/ressources/ressources'
import { ChapterViewModel } from '../../ViewModel/chapter-view-model';
import { PageController } from '../../providers/controllers/page-controller';
import { Page } from '../../Model/page-model';
import { ChapterController } from '../../providers/controllers/chapter-Controller';
import { DomSanitizer } from '@angular/platform-browser';
import { DownloadProvider } from '../../providers/download/download';
import { FileProvider } from '../../providers/file/file';
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
    public _chapterCtr: ChapterController,
    private sanitizer: DomSanitizer,
    public _downloadService: DownloadProvider,
    public _fileService: FileProvider) {
    if (this.navParams.data.offline) {
      this.intOffline();
      this.offline = true;
    } else {
      this.intOnline();
    }

  }
  /***************************************************
   * Initialize component
   ****************************************************/
  intOffline() {
    this.chapterVm = this.navParams.data.chapter;
    this.managName = this.navParams.data.mangaName;

    this.ressources = this._ressources.stringResources;
    this.loaded=false;
    this._downloadService.getPagesByChapterId(this.chapterVm.chapter.id, (data: Array<Page>) => {
      this.pages = new Array<Page>(data.length)
      data.forEach(p => {
        this.pages[p.number - 1] = p;
      })
      this._downloadService.getImageBase64(this.pages[this.index], (page: Page) => {
        this.currentPage = page;
      });
      this.loaded=true;
    })
  }

  intOnline() {
    this.chapterVm = this.navParams.data.chapter;
    this.managName = this.navParams.data.mangaName;
    this.ressources = this._ressources.stringResources;
    this.loaded=false;
    this._pageCtr.getByChapterId(this.chapterVm.chapter.id, this.navParams.data.source)
      .subscribe((data) => {
        this.pages = data;
        this.currentPage = this.pages[this.index];
        this.loaded=true;
      })
  }

  getImgContent(url = "") {
    if (this.offline) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(url);

    }
  }

  swipeEvent(event: any) {
    if (event.direction == 4 && this.index < this.pages.length - 1) {
      this.index++;
    } else if (event.direction == 2 && this.index > 0) {
      this.index--;
    }
    if (this.offline) {
      this._downloadService.getImageBase64(this.pages[this.index], (page: Page) => {
        this.currentPage = page;
      });
    } else {
      this.currentPage = this.pages[this.index];
    }


  }
  /****************************************************
   * Public properties
   *****************************************************/
  ressources: any;
  managName: string;
  chapterVm: ChapterViewModel;;
  pages: Array<Page>
  index: number = 0;
  currentPage: Page;
  offline: boolean = false;
  loaded:boolean=false;
}
