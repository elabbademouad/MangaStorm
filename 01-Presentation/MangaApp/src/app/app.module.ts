import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MangaDetailsPage } from '../pages/manga-details/manga-details'
import { HttpClientModule } from '@angular/common/http'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ComponentsModule} from '../components/components.module'
import { MangaProvider } from '../providers/manga/manga';
import { RessourcesProvider } from '../providers/ressources/ressources';
import { MangaPagePage} from '../pages/manga-page/manga-page';
import { MangaFavorisPage} from '../pages/manga-favoris/manga-favoris';
import { SQLite} from '@ionic-native/sqlite'
import { File} from '@ionic-native/file'
import { DataBaseProvider } from '../providers/data-base/data-base';
import { MangaDownloadsPage} from '../pages/manga-downloads/manga-downloads'
import { FileProvider } from '../providers/file/file';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MangaDetailsPage,
    MangaPagePage,
    MangaDownloadsPage,
    MangaFavorisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MangaDetailsPage,
    MangaPagePage,
    MangaDownloadsPage,
    MangaFavorisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MangaProvider,
    RessourcesProvider,
    SQLite,
    DataBaseProvider,
    FileProvider,
    File
  ]
})
export class AppModule {}
