import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { RessourcesProvider } from '../providers/ressources/ressources'
import { DataBaseProvider } from '../providers/data-base/data-base'
import { MangaFavorisPage } from '../pages/manga-favoris/manga-favoris';
import { RecentsPage } from '../pages/recents/recent-page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;

  pages: Array<{title: string, component: any,icon:any}>;
  ressources: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public _ressources:RessourcesProvider,
              public _dataBase:DataBaseProvider) {
    this.initializeApp();
    this.pages = [
      { title: this.ressources.mangaList, component: ListPage ,icon: 'list' },
      { title: this.ressources.favoris, component: MangaFavorisPage, icon: 'heart' },
      { title: this.ressources.recents, component: RecentsPage, icon: 'time' }
    ];
  }

  initializeApp() {
    this.ressources=this._ressources.stringResources;
    this.platform.ready().then(() => {
      this._dataBase.createOrUpdateDatabase(()=>{
        this.rootPage=ListPage;
        this.splashScreen.hide();
      });
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#26418f');
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  deleteData(){
    this._dataBase.deleteDatabase();
    this._dataBase.createOrUpdateDatabase(()=>{
      this.nav.setRoot(ListPage);
    });
  }
}
