import { NgModule } from '@angular/core';
import { MangaItemComponent } from './manga-item/manga-item';
import {IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [MangaItemComponent],
	imports: [
		IonicModule
	],
	exports: [MangaItemComponent]
})
export class ComponentsModule {}
