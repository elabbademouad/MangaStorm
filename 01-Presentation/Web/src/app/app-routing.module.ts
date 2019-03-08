import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangaListComponent } from './Components/manga-list/manga-list.component';
import { MangaDetailsComponent } from './Components/manga-details/manga-details.component';
import { PageComponent } from './Components/page/page.component';

const routes: Routes = [
  {path:"mangaList",component:MangaListComponent},
  {path:"mangaList/:mangaId",component:MangaDetailsComponent},
  {path:"page/:chapterId",component:PageComponent},
  {path:"", redirectTo:"mangaList", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
