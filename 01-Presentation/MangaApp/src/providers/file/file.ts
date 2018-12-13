import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
@Injectable()
export class FileProvider {
 /****************************************************
   * Constructor
   ****************************************************/
  constructor(public _file: File) {
    this.init();
  }
  /***************************************************
    * Initialize component
    ****************************************************/ 
  init(){
    this.rootPah=this._file.applicationDirectory;
    this.rootStoragePath=this._file.applicationStorageDirectory;
    
    this._file.listDir(this.rootStoragePath,"").then((d)=>{
      console.log(JSON.stringify(d));
    })
    console.log("rootPath:"+this.rootPah);
    console.log("rootStoragePath:"+this.rootStoragePath);
    //this._file.createDir()
  }
 /****************************************************
   * Public properties
  *****************************************************/
  rootPah:string;
  rootStoragePath:string
}
