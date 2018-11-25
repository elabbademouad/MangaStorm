import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MangaDownloadsPage} from '../pages/manga-downloads/manga-downloads'
import { RessourcesProvider } from '../providers/ressources/ressources'
import { DataBaseProvider } from '../providers/data-base/data-base'
import { MangaFavorisPage } from '../pages/manga-favoris/manga-favoris';


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
      { title: this.ressources.home, component: HomePage,icon: 'home' },
      { title: this.ressources.mangaList, component: ListPage ,icon: 'list' },
      { title: this.ressources.downloads, component: MangaDownloadsPage, icon: 'download' },
      { title: this.ressources.favoris, component: MangaFavorisPage, icon: 'heart' }
    ];
  }

  initializeApp() {
    this.ressources=this._ressources.stringResources;
    this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide(); 
    this._dataBase.createOrUpdateDatabase(()=>{
      this.rootPage=ListPage;
    });
    //this._dataBase.deleteDatabase();
    
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
