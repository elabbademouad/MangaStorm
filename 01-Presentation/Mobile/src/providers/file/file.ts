import { Injectable } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file'
@Injectable()
export class FileProvider {

    constructor(public _file: File) {
        console.log("data directory:"+this._file.dataDirectory);
    }
    saveImageFile(fileName: string, base64: string, _callBack: any) {
        this._file.writeFile(this._file.dataDirectory, fileName, base64, { replace: true })
            .then((file: FileEntry) => {
                _callBack(file.toURL());
            });
    }

    getImageAsBase64(fileName: string): Promise<string> {
        return this._file.readAsText(this._file.dataDirectory, fileName)
    }


}
