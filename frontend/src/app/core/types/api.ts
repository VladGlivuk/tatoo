import { FAILURE, SUCCESS } from '../constants/api';

export type ResponseData = {
  status: Status;
  detail: Detail;
  status_code: number;
};

type Detail = null | PageDetails;
type Status = typeof SUCCESS | typeof FAILURE;

type PageDetails = {
  total: number;
  pages: Array<number>;
};
