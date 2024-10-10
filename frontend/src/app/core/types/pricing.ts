import { ResponseData } from './api';

export type PricingItem = {
  image: string;
  text: string;
  id: number;
};

export type PricingResponse = { data: Array<PricingItem> } & ResponseData;
