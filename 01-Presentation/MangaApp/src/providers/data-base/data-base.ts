import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { SQLite, SQLiteObject} from '@ionic-native/sqlite';
import {RessourcesProvider} from '../ressources/ressources'
import {mangaEnt} from './entity/mangaEnt';
import {MangaItemModel} from '../../Model/MangaItemModel';
import {ToastController} from 'ionic-angular';
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
  public createOrUpdateDatabase(onCreate: Function) {
      this._sqlite.create({
              location: 'default',
              name: "manga.db"
          })
          .then((db: SQLiteObject) => {
              this.dbContext = db;
              db.executeSql(this.sqlScripts.createMangaTable, [])
                  .then(() => {
                      db.executeSql(this.sqlScripts.createReadChapter, [])
                          .then(() => {
                              db.executeSql(this.sqlScripts.createChapterTable, [])
                                  .then(() => {
                                      db.executeSql(this.sqlScripts.createChapterTable, [])
                                          .then(() => {
                                              db.executeSql(this.sqlScripts.createPageTable, [])
                                                  .then(() => {
                                                      console.log("database schema has created-OK");
                                                      onCreate();
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
  public addManga(manga: mangaEnt) {
      let params = [manga.name,
          manga.matricule,
          manga.date,
          manga.chapterCount,
          manga.resume,
          manga.cover,
          manga.state,
          manga.tags,
          manga.isFavorite,
          manga.isDownloaded
      ];
      return this.dbContext.executeSql(this.sqlScripts.createManga, params);
  }

  public updateAllManga(mangaList: Array < MangaItemModel > ) {
      this.dbContext.executeSql("SELECT matricule FROM Manga")
          .then((r) => {
              let mangaMatricules = new Array < string > ();
              for (let i = 0; i < r.rows.length; i++) {
                  mangaMatricules.push(r.rows.item(i).matricule);
              };
              if (mangaMatricules.length != 0) {
                  let managToUpdates = mangaList.filter((m) => {
                      return mangaMatricules.find((n) => {
                          return n == m.matricule;
                      }) != undefined;
                  });
                  managToUpdates.forEach((m) => {
                      this.dbContext.executeSql(this.sqlScripts.updateManga, [m.state, m.chapterCount, m.name, m.matricule]).then(() => {});
                  });
              }
          })
  }

  public getManga() {
      return this.dbContext.executeSql(this.sqlScripts.selectAllManga, []);
  }
  public addOrRemoveMangaFromFavorie(manga: MangaItemModel) {
      this.dbContext.executeSql("SELECT matricule FROM Manga WHERE matricule=?", [manga.matricule])
          .then((r) => {
              if (r.rows.length == 0) {
                  this.addManga({
                      chapterCount: manga.chapterCount,
                      cover: manga.cover,
                      date: manga.date,
                      id: 0,
                      isDownloaded: manga.isDownloaded,
                      isFavorite: manga.isFavorite,
                      matricule: manga.matricule,
                      name: manga.name,
                      resume: manga.resume,
                      state: manga.state,
                      tags: manga.tags
                  }).then(r => {
                      let toast = this._toastCtrl.create({
                          message: 'manga was added to favorite successfully',
                          duration: 3000
                      });
                      toast.present();
                  }).catch(err => console.log("add Manga eror:" + JSON.stringify(err)));
              } else {
                  this.dbContext.executeSql("UPDATE Manga SET IsFavorite=? WHERE matricule=?", [manga.isFavorite, manga.matricule])
                      .then(() => {
                          let toast = this._toastCtrl.create({
                              message: (manga.isFavorite) ? 'manga was added to favorite successfully' : 'manga was removed from favorite successfully',
                              duration: 3000
                          });
                          toast.present();
                      });
              }
          }).catch(err => console.log(JSON.stringify(err)));
  }
  public setFavorieOrDownlodedManga(mangaList: Array < MangaItemModel >,after:Function ) {
      this.dbContext.executeSql("SELECT * FROM Manga", [])
          .then((r) => {
              for (let i = 0; i < r.rows.length; i++) {
                  let element = r.rows.item(i);
                  let manga = mangaList.find((m) => {
                      return m.matricule == element.Matricule
                  });
                  manga.isFavorite =eval(element.IsFavorite);
                  manga.isDownloaded = eval(element.IsDownloaded);
              }
              after();
          }).catch((error) => {
              console.log("set favori or downloaded error :" + JSON.stringify(error, Object.getOwnPropertyNames(error)))
          });;
  }
}