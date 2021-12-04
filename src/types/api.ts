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

export interface TransactionApi {
  message: string;
  data: Transaction[];
}

export interface Transaction {
  id: string;
  user_id: string;
  midtrans_id: string;
  total: number;
  shipping_cost: number;
  insurance_cost: number;
  payment_type: string;
  transaction_status: string;
  shipment_status: string;
  fraud_status: string;
  transaction_time: string;
  settlement_time: string;
  items: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
    };
  }[];
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
  photos: {
    id: string;
    photo_link: string;
  }[];
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
