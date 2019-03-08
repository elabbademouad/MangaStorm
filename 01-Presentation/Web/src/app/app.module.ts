import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MangaItemComponent } from './Components/manga-item/manga-item.component'
import { MatCardModule } from '@angular/material/card';
import { MangaListComponent } from './Components/manga-list/manga-list.component';
import { MangaDetailsComponent } from './Components/manga-details/manga-details.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule} from '@angular/material/list';
import { PageComponent } from './Components/page/page.component'


@NgModule({
  declarations: [
    AppComponent,
    MangaItemComponent,
    MangaListComponent,
    MangaDetailsComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatListModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
