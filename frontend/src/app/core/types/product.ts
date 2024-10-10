import { ResponseData } from './api';

export type ProductType = {
  title: string;
  description: string;
  id: number;
  price: number;
  image: string;
  status: string;
  text: string;
  detail: string;
  category_id: number;
  is_active: boolean;
};

export type AllProductsResponse = { data: Array<ProductType> } & ResponseData;

export type ProductByIdResponse = { data: ProductType } & ResponseData;

export type ProductDetailsFormValues = {
  name: string;
  phone: string;
};
