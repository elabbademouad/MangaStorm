import { Component, OnInit } from '@angular/core';
import { MangaDetails } from 'src/Model/manga-details-model';
import { Router} from '@angular/router';
import { MangaService} from '../../Services/manga.service'

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.css']
})
export class MangaListComponent implements OnInit {

  loaded:boolean=false;
  mangaList:Array<MangaDetails>=[]
  constructor(public router :Router,public _mangaService:MangaService) { 
     this._mangaService.getAll().subscribe((data:Array<MangaDetails>)=>{
        this.mangaList=data;
        this.loaded=true;
     })
  }
  
  ngOnInit() {
  }
  public handlerMangaItemClick(mangaId){
    this.router.navigate(['/mangaList', mangaId]);
  }
}
