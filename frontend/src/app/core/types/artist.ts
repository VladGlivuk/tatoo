//types
import { ResponseData } from './api';

export type Artist = {
  id: number;
  title: string;
  position: string;
  text: string | null;
  image: string | null;
};

export type AllArtistsResponse = { data: Array<Artist> } & ResponseData;
