import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAccessName'
})
export class UserAccessNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
