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
import { RessourcesProvider } from '../providers/ressources/ressources';
import { MangaPagePage} from '../pages/manga-page/manga-page';
import { MangaFavorisPage} from '../pages/manga-favoris/manga-favoris';
import { SQLite} from '@ionic-native/sqlite'
import { MangaDownloadsPage} from '../pages/manga-downloads/manga-downloads'
import { MangaItemComponent } from '../components/manga-item/manga-item';
import { MangaController } from '../providers/controllers/manga-Controller';
import { ChapterController } from '../providers/controllers/chapter-Controller';
import { PageController } from '../providers/controllers/page-controller';
import { TagController } from '../providers/controllers/tag-controller';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { RecentsPage } from '../pages/recents/recent-page'
import { MangaSectionComponent } from '../components/manga-section/manga-section';
import { RatingStatusComponent } from '../components/rating-status/rating-status';
import { AppStorageProvider } from '../providers/app-storage/app-storage';
import { IonicStorageModule} from '@ionic/storage'
import { SourceList } from '../pages/sources-list/sources-list';
import { DownloadProvider } from '../providers/download/download';
import { DownloadPercentPipe } from '../pipes/download-percent/download-percent';
import { DownloadStateItemComponent } from '../components/download-state-item/download-state-item';
import { ChooseChaptersPage } from '../pages/choose-chapters-page/choose-chapters-page';
import { FileProvider } from '../providers/file/file';
import { File} from '@ionic-native/file'
import { LoadingComponent } from '../components/loading/loading';
import { ManageDataPage } from '../pages/manage-data-page/manage-data-page';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MangaDetailsPage,
    MangaPagePage,
    MangaDownloadsPage,
    MangaFavorisPage,
    MangaItemComponent,
    RecentsPage,
    MangaSectionComponent,
    RatingStatusComponent,
    SourceList,
    DownloadPercentPipe,
    DownloadStateItemComponent,
    ChooseChaptersPage,
    LoadingComponent,
    ManageDataPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageViewerModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MangaDetailsPage,
    MangaPagePage,
    MangaDownloadsPage,
    MangaFavorisPage,
    MangaItemComponent,
    RecentsPage,
    MangaSectionComponent,
    RatingStatusComponent,
    SourceList,
    DownloadStateItemComponent,
    ChooseChaptersPage,
    LoadingComponent,
    ManageDataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RessourcesProvider,
    SQLite,
    MangaController,
    ChapterController,
    PageController,
    TagController,
    AppStorageProvider,
    DownloadProvider,
    FileProvider,
    File
  ]
})
export class AppModule {}
