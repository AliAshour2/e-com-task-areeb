export const BaseUrlFake = "https://fakestoreapi.com/"

// src/app/core/constants/api-endpoints.const.ts
export const API_ENDPOINTS = {
  PRODUCTS: {
    BASE: '/products',
    SINGLE: (id: string) => `/products/${id}`,
    CATEGORIES: '/products/categories',
    CATEGORY: (category: string) => `/products/category/${category}`
  },
  CARTS: {
    BASE: '/carts',
    USER: (userId: number) => `/carts/user/${userId}`
  },

};


export const BaseUrl = "https://ecommerce.routemisr.com/api/v1/"
export const SignUpEndPoint = `${BaseUrl}auth/signup`
export const SingInEndPoint = `${BaseUrl}auth/signin`
export const GetAllProductEndPoint = `BaseUrl/products`