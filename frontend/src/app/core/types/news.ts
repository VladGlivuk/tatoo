import { RIGHT } from './../constants/news';
import { BLUE, GREEN, LEFT, RED, YELLOW } from '../constants/news';
import { ResponseData } from './api';

export type NewsByIdResponse = { data: NewsItem } & ResponseData;

export type AllNewsResponse = { data: Array<NewsItem> } & ResponseData;

export type NewsItem = {
  id: number;
  text: string;
  date: string;
  images: null | Array<string>;
  title: string;
  description: string;
};

export type NewsColor = typeof GREEN | typeof BLUE | typeof YELLOW | typeof RED;

export type NewsImagePlacement = typeof LEFT | typeof RIGHT;
