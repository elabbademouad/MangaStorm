import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { RessourcesProvider } from '../providers/ressources/ressources'
import { MangaFavorisPage } from '../pages/manga-favoris/manga-favoris';
import { RecentsPage } from '../pages/recents/recent-page';
import { HomePage } from '../pages/home/home';
import { AppStorageProvider } from '../providers/app-storage/app-storage';
import { SourceList } from '../pages/sources-list/sources-list';
import { SourceViewModel } from '../ViewModel/source-view-model';
import { MangaDownloadsPage } from '../pages/manga-downloads/manga-downloads';
import { DownloadProvider } from '../providers/download/download';
import { ManageDataPage } from '../pages/manage-data-page/manage-data-page';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{ title: string, component: any, icon: any }>;
  ressources: any;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public _ressources: RessourcesProvider,
    public _storage: AppStorageProvider,
    public _download: DownloadProvider) {
    this.initializeApp();
    this.pages = [
      { title: this.ressources.home, component: HomePage, icon: 'home' },
      { title: this.ressources.mangaList, component: ListPage, icon: 'list' },
      { title: this.ressources.favoris, component: MangaFavorisPage, icon: 'heart' },
      { title: this.ressources.downloads, component: MangaDownloadsPage, icon: 'download' },
      { title: this.ressources.recents, component: RecentsPage, icon: 'time' },
      { title: this.ressources.sourceMenu, component: SourceList, icon: 'create' },
      // { title:this.ressources.manageData,component:ManageDataPage,icon:'pie'}
    ];
  }

  initializeApp() {
    this.ressources = this._ressources.stringResources;
    this.platform.ready().then(() => {
      this.setDefaultSource();
      this.rootPage = HomePage;
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#64b5f6');
    });
  }
  openPage(page: any) {
    this.nav.setRoot(page.component);
  }
  setDefaultSource(){
    if(localStorage.getItem("mangaSource")==null){
      let src: SourceViewModel = { 
        "logo": "http://35.211.13.59:80/mangastorm.PNG",
        "rating": 4, 
        "source": { 
          "label": "mangaStorm",
          "id":"0",
        } ,
        "language":'عربية'
      };
      localStorage.setItem("mangaSource", JSON.stringify(src))
    }
  }
}
