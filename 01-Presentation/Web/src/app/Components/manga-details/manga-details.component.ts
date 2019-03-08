import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../Services/manga.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MangaDetails } from 'src/Model/manga-details-model';
import { ChapterService } from 'src/app/Services/chapter.service';
import { Chapter } from 'src/Model/chapter-model';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  styleUrls: ['./manga-details.component.css']
})
export class MangaDetailsComponent implements OnInit {

  manga:MangaDetails={ } as any;
  chapters:Array<Chapter>=[];
  constructor(public _mangaService:MangaService,
              public route:ActivatedRoute,
              public _chapterService:ChapterService,
              public _router:Router) { 
      let mangaId= this.route.snapshot.params['mangaId'];
      _mangaService.getMangaFullDetail(mangaId).subscribe((data:MangaDetails)=>{
        this.manga=data;
      })
      _chapterService.getChaptersByMangaId(mangaId).subscribe((data:Array<Chapter>)=>{
        this.chapters=data;
      })

  }
 
  ngOnInit() {
  }

  handleChapterClick(chapterId:string){
    this._router.navigate(['/page', chapterId]);
  }

}
