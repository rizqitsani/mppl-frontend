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
