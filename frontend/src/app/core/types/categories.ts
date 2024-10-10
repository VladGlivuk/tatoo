import { ResponseData } from './api';

export type Category = {
  title: string;
  description: string;
  id: number;
  image: string | null;
};

export type AllCategoriesResponse = { data: Array<Category> } & ResponseData;
