export const BaseUrl =  "https://fakestoreapi.com/"

// src/app/core/constants/api-endpoints.const.ts
export const API_ENDPOINTS = {
    PRODUCTS: {
      BASE: '/products',
      CATEGORIES: '/products/categories',
      CATEGORY: (category: string) => `/products/category/${category}`
    },
    CARTS: {
      BASE: '/carts',
      USER: (userId: number) => `/carts/user/${userId}`
    }
  };