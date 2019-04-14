import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochToDateTime'
})
export class EpochToDateTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value);
  }

}
