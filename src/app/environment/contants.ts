export const BaseUrlFake = "https://fakestoreapi.com/"

// src/app/core/constants/api-endpoints.const.ts
export const API_ENDPOINTS = {
  PRODUCTS: {
    BASE: 'products',
    SINGLE: (id: string) => `products/${id}`,
    CATEGORIES: 'categories',
    CATEGORY: (category: string) => `products?category[in]=${category}`,
    BRAND: (brand: string) => `products?brand=${brand}`,
    SEARCH: (keyword: string) => `products?keyword=${keyword}`
  },
  CARTS: {
    BASE: 'carts',
    USER: (userId: number) => `carts/user/${userId}`
  },

};


export const BaseUrl = "https://ecommerce.routemisr.com/api/v1/"
export const SignUpEndPoint = `${BaseUrl}auth/signup`
export const SingInEndPoint = `${BaseUrl}auth/signin`