import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RessourcesProvider } from '../providers/ressources/ressources'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;

  pages: Array<{title: string, component: any}>;
  ressources: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public _ressources:RessourcesProvider) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: this.ressources.home, component: HomePage },
      { title: this.ressources.mangaList, component: ListPage }
    ];

  }

  initializeApp() {
    this.ressources=this._ressources.stringResources;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
