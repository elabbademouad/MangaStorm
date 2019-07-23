import { Component } from "@angular/core";
import { RessourcesProvider } from "../../providers/ressources/ressources";
import { NavController } from "ionic-angular";
import { AppStorageProvider } from "../../providers/app-storage/app-storage";
import { SourceViewModel } from "../../ViewModel/source-view-model";
import { MangaController } from "../../providers/controllers/manga-Controller";
import { HomePage } from "../home/home";

@Component({
    selector: 'sources-list',
    templateUrl: 'sources-list.html'
})
export class SourceList {
    resources:any;
    selectedSource:SourceViewModel;
    sources:Array<SourceViewModel>=[];
    constructor(public _ressources:RessourcesProvider,
                public navCtrl: NavController,
                public _storage:AppStorageProvider,
                public _mangaCtr:MangaController){
        this.init();
    }

    init(){
        this.resources=this._ressources.stringResources;
        this.selectedSource=this._mangaCtr.currentMangaSource();
        this._mangaCtr.getMangaSources().subscribe((data:Array<SourceViewModel>)=>{
            this.sources=data;
        });
    }

    applyMangSource(item:SourceViewModel){
        localStorage.setItem("mangaSource",JSON.stringify(item))
        this.navCtrl.setRoot(HomePage);
    }

    
}