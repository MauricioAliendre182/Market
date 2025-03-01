import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowelsByNumbers'
})
export class VowelsByNumbersPipe implements PipeTransform {

  transform(value: string): string {
    return value
    .replace(/(a)/gi, "1")
    .replace(/(e)/gi, "2")
    .replace(/(i)/gi, "3")
    .replace(/(o)/gi, "4")
    .replace(/(u)/gi, "5");
  }

}
