import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightKilogram'
})
export class WeightKilogramPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
