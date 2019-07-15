import { Component, Input } from '@angular/core';
import { DownloadState } from '../../Model/donwload-state-model';
import { RessourcesProvider } from '../../providers/ressources/ressources';
import { DownloadProvider } from '../../providers/download/download';
import { DownloadStateEnum } from '../../enums/download-state-enum';


@Component({
  selector: 'download-state-item',
  templateUrl: 'download-state-item.html'
})
export class DownloadStateItemComponent {

  selected:boolean=false;
  ressources:any;
  @Input()
  downloadState:DownloadState;
  constructor(public _ressources:RessourcesProvider,
              public _downloadService:DownloadProvider){
    this.ressources=this._ressources.stringResources;
  }
  getPercentValue(total:number,current:number):number{
    if(total==null || total ==undefined || total==NaN ||total==0){
      return 0;
    }
    if(current==null || current ==undefined || current==NaN || current==0){
      return 0;
    }
    return Math.floor((current/total)*100);
  }
  handleClickResume(){
    this._downloadService.resume(this.downloadState);
  }
  handleClickRetry(){
    this._downloadService.retryDownload(this.downloadState);
  }
  getErrors(){
    let temp=this.downloadState.chapters.filter((c)=>{return c.state==DownloadStateEnum.error;});
    if(temp!=null){
      return temp.length;
    }else{
      return 0;
    }
  }


}
