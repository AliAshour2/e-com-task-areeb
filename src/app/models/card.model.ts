export interface Product {
  id: number;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  description: string;
  category: string;
  image: string;
  imageCover: string;
  images?: string[];
  brand?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  subcategory?: Array<{
    _id: string;
    name: string;
    slug: string;
    category: string;
  }>;
  quantity?: number;
  sold?: number;
  rating: {
    rate: number;
    count: number;
  };
  ratingsAverage?: number;
  ratingsQuantity?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}



export interface Card {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    size?: string;
}



export interface Developer {
    id?: number;
    image: string;
    name: string;
    role: string;
    level: string;
    salary: number;
    description: string;
    status: ContactStatus;
}

export interface AddDeveloperForm {
    name: string;
    role: string;
    level: string;
    salary: number;
    description: string;
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