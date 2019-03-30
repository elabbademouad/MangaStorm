import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite,   SQLiteObject } from '@ionic-native/sqlite';
import { RessourcesProvider } from '../ressources/ressources'
import { ToastController } from 'ionic-angular';
import { MangaDetailsViewModel } from '../../ViewModel/manga-details-View-model';
import { Chapter } from '../../Model/chapter-model';
@Injectable()
export class DataBaseProvider {

  /****************************************************
   * Constructor
   ****************************************************/
  constructor(public http: HttpClient,
    public _sqlite: SQLite,
    public _ressources: RessourcesProvider,
    public _toastCtrl: ToastController) {
    this.init();
  }
  /***************************************************
   * Initialize component
   ****************************************************/
  init() {
    this.sqlScripts = this._ressources.sqlScript;
  }
  /****************************************************
   * Public properties
   *****************************************************/
  private dbContext: SQLiteObject;
  private sqlScripts: any;
  /****************************************************
   * Public methodes
   *****************************************************/
  public createOrUpdateDatabase(callBack: Function) {
    this._sqlite.create({
        location: 'default',
        name: "manga.db"
      })
      .then((db: SQLiteObject) => {
        this.dbContext = db;
        db.executeSql(this._ressources.sqlScript.createMangaTable, [])
          .then(() => {
            db.executeSql(this._ressources.sqlScript.createReadChapter, [])
              .then(() => {
                db.executeSql(this._ressources.sqlScript.createChapterTable, [])
                  .then(() => {
                    db.executeSql(this._ressources.sqlScript.createChapterTable, [])
                      .then(() => {
                        db.executeSql(this._ressources.sqlScript.createPageTable, [])
                          .then(() => {
                            console.log("database schema has created-OK");
                            callBack();
                          })
                      })
                  })
              })
          });
      }).catch((error) => {
        console.log("createOrUpdateDatabase error :" + error)
      });
  }
  public deleteDatabase() {
    this._sqlite.deleteDatabase({
        location: 'default',
        name: "manga.db"
      })
      .then((e) => {
        console.log(e);
      }).catch((error) => {
        console.log("deleteDatabase error :" + error)
      });
  }
  public addManga(manga: MangaDetailsViewModel) {
    let params = [
      manga.item.id,
      manga.item.name,
      manga.item.date,
      manga.item.countChapters,
      manga.item.resume,
      manga.item.cover,
      manga.item.state,
      manga.item.tags,
      manga.isFavorite,
      manga.isDownloaded
    ];
    return this.dbContext.executeSql(this.sqlScripts.createManga, params);
  }

  public updateAllManga(mangaList: Array < MangaDetailsViewModel > ) {
    this.dbContext.executeSql(this._ressources.sqlScript.selectMangaIds)
      .then((r) => {
        let mangaIds = new Array < string > ();
        for (let i = 0; i < r.rows.length; i++) {
          mangaIds.push(r.rows.item(i).id);
        };
        if (mangaIds.length != 0) {
          let managToUpdates = mangaList.filter((m) => {
            return mangaIds.find((n) => {
              return n == m.item.id;
            }) != undefined;
          });
          managToUpdates.forEach((m) => {
            this.dbContext.executeSql(this.sqlScripts.updateManga, [m.item.state, m.item.countChapters, m.item.name, m.item.id]).then(() => {});
          });
        }
      })
  }

  public getManga() {
    return this.dbContext.executeSql(this.sqlScripts.selectAllManga, []);
  }
  public getFavoriteManga() {
    return this.dbContext.executeSql(this._ressources.sqlScript.selectFavoriteManga, [true]);
  }
  public addOrRemoveMangaFromFavorie(manga: MangaDetailsViewModel) {
    this.dbContext.executeSql(this._ressources.sqlScript.checkIfMangaExists, [manga.item.id])
      .then((r) => {
        if (r.rows.length == 0) {
          this.addManga({
            item:{
              countChapters: manga.item.countChapters,
              cover: manga.item.cover,
              date: manga.item.date,
              id: manga.item.id,
              name: manga.item.name,
              resume: manga.item.resume,
              state: manga.item.state,
              tags: manga.item.state
            },
            isDownloaded: manga.isDownloaded,
            isFavorite: manga.isFavorite
          }).then(r => {
            let toast = this._toastCtrl.create({
              message: manga.item.name + ' ' + this._ressources.stringResources.addFavoriteSuccess,
              duration: 3000,
              cssClass: "toast"
            });
            toast.present();
          }).catch(err => console.log("add Manga eror:" + JSON.stringify(err)));
        } else {
          this.dbContext.executeSql(this._ressources.sqlScript.setMangaAsFavorite, [manga.isFavorite, manga.item.id])
            .then(() => {
              let toast = this._toastCtrl.create({
                message: (manga.isFavorite) ? manga.item.name + ' ' + this._ressources.stringResources.addFavoriteSuccess : manga.item.name + ' ' + this._ressources.stringResources.removeFavorite,
                duration: 3000,
                cssClass: "toast"
              });
              toast.present();
            });
        }
      }).catch(err => console.log(JSON.stringify(err)));
  }
  public setFavorieOrDownlodedManga(mangaList: Array < MangaDetailsViewModel > , callBack: Function) {
    this.dbContext.executeSql(this._ressources.sqlScript.selectAllManga, [])
      .then((r) => {
        for (let i = 0; i < r.rows.length; i++) {
          let element = r.rows.item(i);
          let manga = mangaList.find((m) => {
            return m.item.id == element.id
          });
          manga.isFavorite = eval(element.IsFavorite);
          manga.isDownloaded = eval(element.IsDownloaded);
        }
        callBack();
      }).catch((error) => {
        console.log("set favori or downloaded error :" + JSON.stringify(error, Object.getOwnPropertyNames(error)))
      });;
  }

  public setChapterAsRead(chapter:Chapter,mangaName:string) {
    this.dbContext.executeSql(this._ressources.sqlScript.insertChapterAsRead, [mangaName, chapter.number, chapter.title, new Date()])
      .then((r) => {}).catch((error) => {
        console.log("setChapterAsRead error :" + JSON.stringify(error, Object.getOwnPropertyNames(error)))
      });
  }
  public getReadMangaChapters(mangaName: string) {
    return this.dbContext.executeSql(this._ressources.sqlScript.getReadChapters, [mangaName]);
  }
}
