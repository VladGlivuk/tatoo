//types
import { ResponseData } from './api';
//constants
import { LIGHTBOX_ACTIVE } from '../constants';

export type MediaItemType = {
  image: string;
  description: string | null;
  id: number;
  date: string;
};

export type AllMediaResponse = { data: Array<MediaItemType> } & ResponseData;

export type PopUpActive = typeof LIGHTBOX_ACTIVE | null;
