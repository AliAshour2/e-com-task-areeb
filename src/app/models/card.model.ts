export interface Card {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    size?: string;
}


export enum Category {
    Clothing = 'Clothing',
    Outerwear = 'Outerwear',
    Footwear = 'Footwear',
    Shoes = 'Shoes',
    Sweaters = 'Sweaters',
    Accessories = 'Accessories'
  }
  
  export enum Size {
    S = 'S',
    M = 'M',
    L = 'L',
    OneSize = 'One Size'
  }

  export type SortOption = 'default' | 'low' | 'high';

  export enum SortOptionEnum {
    Default = 'default',
    Low = 'low',
    High = 'high'
  }

  export enum ContactStatus {
    Contacted = 'Contacted',
    NotContacted = 'Not-Contacted'
  }