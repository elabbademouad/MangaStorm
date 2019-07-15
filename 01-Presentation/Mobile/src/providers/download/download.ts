import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { DownloadState } from '../../Model/donwload-state-model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage'
import { ChapterViewModel } from '../../ViewModel/chapter-view-model';
import { PageController } from '../controllers/page-controller';
import { Page } from '../../Model/page-model';
import { MangaController } from '../controllers/manga-Controller';
import { DownloadStateEnum } from '../../enums/download-state-enum';
import { ChapterDownload } from '../../Model/chapter-download-model';
import { ToastController } from 'ionic-angular';
import { FileProvider } from '../file/file';
import { ChapterController } from '../controllers/chapter-Controller';

@Injectable()
export class DownloadProvider {

  private lastdownloadStateKey = "LASTDOWNLOADSTATEKEY";
  private _currentStateSubject: Subject<Array<DownloadState>> = new Subject<Array<DownloadState>>();
  constructor(public http: HttpClient,
    public _storage: Storage,
    public _pageCtr: PageController,
    public _mangaCtr: MangaController,
    public _toastCtrl: ToastController,
    public _fileService: FileProvider,
    public _chapterCtrl: ChapterController) {
    this.init();
  }

  download(manga: MangaDetailsViewModel, chapters: Array<ChapterViewModel>) {
    let toast = this._toastCtrl.create({
      message: 'عملية التحميل جارية ، يمكنك تتبعها على صفحة التحميلات',
      duration: 4000,
      cssClass: "toast"
    });
    toast.present();
    let download = new DownloadState();
    download.manga = manga;
    download.chapters = [];
    download.downloadChaptersCount = 0;
    download.state = DownloadStateEnum.ongoing;
    chapters.forEach(c => {
      download.chapters.push({
        chapter: c,
        state: DownloadStateEnum.ongoing
      });
    });
    download.state = download.state = DownloadStateEnum.ongoing;
    this.setLastState(download, true);
    download.chapters.forEach(c => {
      if (c.state == DownloadStateEnum.ongoing) {
        this._pageCtr.downloadChapter(c.chapter.chapter.id, download.manga.item.source.id)
          .subscribe((pages: Page[]) => {
            this.saveChapter(c, pages, download);
          },()=>{
            c.state=DownloadStateEnum.error;
            this.saveChapter(c, [], download)
          })
      }
    });
  }
  init() {
    this.getLastState((items: Array<DownloadState>) => {
      if (items != null) {
        items.forEach(s => {
          if (s.state == DownloadStateEnum.ongoing) {
            s.state = DownloadStateEnum.break;
            s.chapters.forEach(c => {
              if (c.state == DownloadStateEnum.ongoing) {
                c.state = DownloadStateEnum.break;
              }
            })
          }
        })
        this._storage.set(this.lastdownloadStateKey, items);
      }
    })
  }
  resume(download: DownloadState) {
    //download.chapters = download.chapters.filter(c=>{return c.state==DownloadStateEnum.break});
    download.state = DownloadStateEnum.ongoing;
    download.chapters.forEach(c => {
      if(c.state==DownloadStateEnum.break){
        c.state=DownloadStateEnum.ongoing;
      }
    });
    download.state = download.state = DownloadStateEnum.ongoing;
    this.setLastState(download);
    download.chapters.forEach(c => {
      if (c.state == DownloadStateEnum.ongoing) {
        this._pageCtr.downloadChapter(c.chapter.chapter.id, download.manga.item.source.id)
          .subscribe((pages: Page[]) => {
            this.saveChapter(c, pages, download);
          },()=>{
            c.state=DownloadStateEnum.error;
            this.saveChapter(c, [], download)
          })
      }
    });
  }

  getCurrentState(): Observable<Array<DownloadState>> {
    return this._currentStateSubject.asObservable();
  }

  getLastState(_callback: any) {
    this._storage.get(this.lastdownloadStateKey).then((item: Array<DownloadState>) => {
      _callback(item);
    });
  }
  retryDownload(download: DownloadState) {
    download.state = DownloadStateEnum.ongoing;
    download.chapters.forEach(c => {
      if(c.state==DownloadStateEnum.error){
        c.state=DownloadStateEnum.ongoing;
      }
    });
    this.setLastState(download);
    download.chapters.forEach(c => {
      if (c.state == DownloadStateEnum.ongoing) {
        this._pageCtr.downloadChapter(c.chapter.chapter.id, download.manga.item.source.id)
          .subscribe((pages: Page[]) => {
            this.saveChapter(c, pages, download);
          },()=>{
            c.state=DownloadStateEnum.error;
            this.saveChapter(c, [], download)
          })
      }
    });
  }
  private saveChapter(chapter: ChapterDownload, pages: Page[], state: DownloadState) {
    if(chapter.state!=DownloadStateEnum.error){
      pages.forEach(p => {

        p.url = this.removeSpecialCaracters(p.url);
        this._fileService.saveImageFile(p.url, p.base64, () => {
        });
        p.base64 = "";
      });
      this._storage.set(chapter.chapter.chapter.id, pages).then(() => {
        chapter.state = DownloadStateEnum.done;
        state.downloadChaptersCount++;
        let temp=state.chapters.filter(c=>{return c.state==DownloadStateEnum.ongoing});
        if(temp==null || temp.length ==0){
          state.state=DownloadStateEnum.done;
        }
        this.setLastState(state);
      });
    }else{
        let temp=state.chapters.filter(c=>{return c.state==DownloadStateEnum.ongoing});
        if(temp==null || temp.length ==0){
          state.state=DownloadStateEnum.done;
        }
        this.setLastState(state);
    }
    
  }

  private setLastState(state: DownloadState, firstTime: boolean = false) {
    this.getLastState(((lastDownload: DownloadState[], _callback: any = null) => {
      if (lastDownload != null) {
        let tempIndex = lastDownload.findIndex(item => { return item.manga.item.id == state.manga.item.id; });
        if (tempIndex != -1) {
          if (firstTime) {
            state.downloadChaptersCount += lastDownload[tempIndex].downloadChaptersCount;
            state.chapters.push(...lastDownload[tempIndex].chapters)
          }
          lastDownload[tempIndex] = state;
        } else {
          lastDownload.unshift(state);
        }
      } else {
        lastDownload = [state];
      }
      this._storage.ready().then(() => {
        this._storage.set(this.lastdownloadStateKey, lastDownload).then(() => {
          this._currentStateSubject.next(lastDownload);
        });
      })
    }));
  }

  getDownloadChaptersId(mangaId: string, _callback: any) {
    this._storage.ready().then(() => {
      this._storage.get(this.lastdownloadStateKey).then((items: Array<DownloadState>) => {
        let chapters = [];
        if (items != null) {
          items.forEach(m => {
            if (m.manga.item.id == mangaId) {
              chapters = m.chapters.map(c => c.chapter.chapter.id);
            }
          })
        }
        _callback(chapters);
      })
    })
  }
  getDownloadChapters(mangaId: string, _callback: any) {
    this._storage.ready().then(() => {
      this._storage.get(this.lastdownloadStateKey).then((items: Array<DownloadState>) => {
        let chapters = [];
        if (items != null) {
          items.forEach(m => {
            if (m.manga.item.id == mangaId) {
              chapters = m.chapters.filter(c=>{return c.state==DownloadStateEnum.done}).map(c => c.chapter.chapter);
            }
          })
        }
        _callback(chapters);
      })
    })
  }


  getPagesByChapterId(chapterId: string, _callback: any) {
    this._storage.ready().then(() => {
      this._storage.get(chapterId).then((items: Array<Page>) => {
        _callback(items);
      });
    })
  }
  getImageBase64(page: Page, _callback: any) {
    if (page != undefined) {
      this._fileService.getImageAsBase64(page.url).then((content: string) => {
        page.base64 = content;
        _callback(page);
      })
    } else {
      _callback(page);
    }
  }

  private removeSpecialCaracters(url: string): string {
    return url.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  }
}


