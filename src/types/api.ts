import { User } from '@/types/auth';

export interface UserInfoApi {
  message: string;
  data: User;
}

export interface ProductApi {
  message: string;
  data: Product[];
}

export interface ProductDetailApi {
  message: string;
  data: Product;
}

export interface CartApi {
  message: string;
  data: {
    items: Cart[];
    total: number;
  };
}

export interface TransactionTokenApi {
  message: string;
  data: {
    token: string;
    redirect_url: string;
    id: string;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  available: false;
  created_at: string;
  updated_at: string;
  photos: string[];
}

export interface Cart {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: {
    name: string;
    price: number;
  };
}
