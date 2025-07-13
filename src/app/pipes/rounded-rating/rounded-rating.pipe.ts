import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundedRating'
})
export class RoundedRatingPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value);
  }

}
