import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/Services/page.service';
import { Page } from 'src/Model/page-model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  pages:Array<Page>=[];
  constructor(public _route:ActivatedRoute,
              public _pageService:PageService) { 
    let chapterId=this._route.snapshot.params['chapterId'];
    this._pageService.getChaptersByMangaId(chapterId).subscribe((data:Array<Page>)=>{
      this.pages=data;
    })
  }

  ngOnInit() {
  }

}
