import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { Recent } from '../../ViewModel/recent';
import { Chapter } from '../../Model/chapter-model';
@Injectable()
export class AppStorageProvider {

  mangasKey: string = "MANGAS";
  chaptersKey: string = "CHAPTERS";
  recentsKey: string = "RECENTS";
  constructor(public _storage: Storage) {

  }

  createManga(manga: MangaDetailsViewModel): Promise<any> {
    return this._storage.get(this.mangasKey).then((items: Array<MangaDetailsViewModel>) => {
      if (items == null) {
        return this._storage.set(this.mangasKey, [manga]);
      } else {
        items.push(manga);
        return this._storage.set(this.mangasKey, items);
      }
    });
  }

  setFavorieOrDownlodedManga(manga: MangaDetailsViewModel) {
    this._storage.get(this.mangasKey).then((items: Array<MangaDetailsViewModel>) => {
      if (items != null && items != undefined) {
        for (let i: number = 0; i < items.length; i++) {
          if (items[i].item.id == manga.item.id) {
            manga.isFavorite = items[i].isFavorite;
            manga.isDownloaded = items[i].isDownloaded;
          }
        }
      }
    });
  }

  updateManga(manga: MangaDetailsViewModel): Promise<any> {
    return this._storage.get(this.mangasKey).then((items: Array<MangaDetailsViewModel>) => {
      if (items != null && items != undefined) {       
        let exists: boolean = false;
        for (let i: number = 0; i < items.length; i++) {
          if (items[i].item.id == manga.item.id) {
            items[i] = manga;
            exists = true;
          }
        }
        if (exists) {
          return this._storage.set(this.mangasKey, items);
        }
        else {
          items.push(manga);
          return this._storage.set(this.mangasKey, items);
        }
      } else {
        return this._storage.set(this.mangasKey, [manga]);
      }
    });
  }
  setChapterAsRead(chapter: Chapter, mangaName: string) {
    let recent = new Recent();
    recent.chapterId = chapter.id;
    recent.chapterName = chapter.title;
    recent.mangaId = chapter.mangaId;
    recent.chapterNumber = chapter.number;
    recent.mangaName = mangaName;
    recent.date = new Date();
    recent.source = chapter.source;
    this._storage.get(this.recentsKey)
      .then((items: Array<Recent>) => {
        if (items != null && items != undefined) {
          items.push(recent);
          this._storage.set(this.recentsKey, items);
        } else {
          this._storage.set(this.recentsKey, [recent]);
        }

      })

  }
  getReadMangaChapters(mangaId: string, _callBack: any) {
    this._storage.get(this.recentsKey).then((items: Array<Recent>) => {
      if (items != null && items != undefined) {
        let recent = items.filter((r => { return r.mangaId == mangaId; }));
        if (recent != null && recent != undefined) {
          _callBack(recent);
        }
        else {
          _callBack([]);
        }
      } else {
        _callBack([])
      }
    });
  }

  getFavoriteManga(_callBack: any) {
    this._storage.get(this.mangasKey).then((items: Array<MangaDetailsViewModel>) => {
      if (items != null && items != undefined) {
        let result = items.filter((m) => { return m.isFavorite });
        if (result != null && result != undefined && result.length != 0) {
          _callBack(result.map(m => m.item));
        } else {
          _callBack([]);
        }
      }
      else {
        _callBack([]);
      }
    });
  }
  getRecentsRead(_callBack: any) {
    this._storage.get(this.recentsKey).then((items: Array<Recent>) => {
      if (items != null && items != undefined) {
        _callBack(items);
      } else {
        _callBack([])
      }
    });
  }
  clear(){
    this._storage.clear();
  }
  getLastReadChapterByMangaId(mangaId:any,_callBack: any){
    this._storage.get(this.recentsKey).then((items: Array<Recent>) => {
      if (items != null && items != undefined) {
        let item=items.filter((r)=>{
          return r.mangaId==mangaId;
        })
        if(item!=null && item.length!=0){
          _callBack(item[0]);
        }
        _callBack(null);
      } else {
        _callBack(null)
      }
    });
  }
  deleteRecentRead(chapterId:string,_callBack:any){
    this._storage.get(this.recentsKey).then((items:Array<Recent>)=>{
      if(items!=null){
        let temp=items.filter(r=>{return r.chapterId!=chapterId;});
        this._storage.set(this.recentsKey,temp).then(()=>{
          _callBack(temp);
        })
      }
    })
  }
  
}
