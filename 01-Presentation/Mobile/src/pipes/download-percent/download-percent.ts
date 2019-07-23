import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DownloadPercentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'downloadPercent',
})
export class DownloadPercentPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
