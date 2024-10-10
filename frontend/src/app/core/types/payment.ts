import { ResponseData } from './api';

export type RegisterPaymentTransactionResponse = {data: string} & ResponseData;

export type PaymentCheckoutResponse = { data: string } & ResponseData;

export type RegistrateCheckoutRequestValues = {
  product_id: number;
  name: string;
  phone_number: string;
};
