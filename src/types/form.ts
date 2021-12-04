import { FileWithPreview } from '@/types/dropzone';

export type ProductData = {
  name: string;
  description: string;
  price: string;
  stock: number;
  status: string;
  image: FileWithPreview[];
};

export type TransactionData = {
  status: string;
};
