import { NgModule } from '@angular/core';
import { MangaItemComponent } from './manga-item/manga-item';
import {IonicModule } from 'ionic-angular';
import { ChaptersComponent } from './chapters/chapters';
import { MangaDetailsComponent } from './manga-details/manga-details';
@NgModule({
	declarations: [MangaItemComponent,
    ChaptersComponent,
    MangaDetailsComponent],
	imports: [
		IonicModule
	],
	exports: [MangaItemComponent,
    ChaptersComponent,
    MangaDetailsComponent]
})
export class ComponentsModule {}
