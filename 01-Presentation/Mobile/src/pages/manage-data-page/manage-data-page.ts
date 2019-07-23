import { Component } from "@angular/core";
import { RessourcesProvider } from "../../providers/ressources/ressources";
import { FileProvider } from "../../providers/file/file";

@Component({
    selector: 'manage-data-page',
    templateUrl: 'manage-data-page.html'
})
export class ManageDataPage {
    resources:any;
    constructor(public _ressources:RessourcesProvider,
                public _file:FileProvider
                ){
        this.init();
    }

    init(){
        this.resources=this._ressources.stringResources;
        this._file.getStorageFileSize();
    }

    
}