//types
import { RegistrateCheckoutRequestValues } from 'src/app/core/types';

export const getRegistratePaymentTransactionRequestValues = (productId: number, name: string, phoneNumber: string): RegistrateCheckoutRequestValues => {
  return {
    product_id: productId,
    name,
    phone_number: phoneNumber,
  };
};
