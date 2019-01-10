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
