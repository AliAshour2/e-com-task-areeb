import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsFilterService {

  constructor() { }


  private category$ = new BehaviorSubject<string>('all');
  private priceRange$ = new BehaviorSubject<string>('all');
  private minRating$ = new BehaviorSubject<string>('all');
  private sort$ = new BehaviorSubject<string>('default');

  setCategory(category: string) { this.category$.next(category); }
  setPriceRange(range: string) { this.priceRange$.next(range); }
  setMinRating(rating: string) { this.minRating$.next(rating); }
  setSort(sort: string) { this.sort$.next(sort); }


  get category() { return this.category$.asObservable(); }
  get priceRange() { return this.priceRange$.asObservable(); }
  get minRating() { return this.minRating$.asObservable(); }
  get sort() { return this.sort$.asObservable(); }

}
