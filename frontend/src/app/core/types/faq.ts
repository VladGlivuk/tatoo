import { ResponseData } from './api';

export type FaqItem = {
  question: string;
  answer: string;
  id: number;
};

export type FaqByIdResponse = { data: FaqItem } & ResponseData;

export type AllFaqResponse = { data: Array<FaqItem> } & ResponseData;