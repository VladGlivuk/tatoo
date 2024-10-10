import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
//types
import { PaymentCheckoutResponse, RegisterPaymentTransactionResponse, RegistrateCheckoutRequestValues } from 'src/app/core/types';
//helpers
import { getRegistratePaymentTransactionRequestValues } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  registratePaymentTransaction(productId: number, name: string, phoneNumber: string): Observable<RegisterPaymentTransactionResponse> {
    const bodyRequest: RegistrateCheckoutRequestValues = getRegistratePaymentTransactionRequestValues(productId, name, phoneNumber);

    return this.http.post<RegisterPaymentTransactionResponse>(`${environment.API_BASE_URL}checkout/registrate/`, bodyRequest);
  }

  makePaymentCheckout(orderId: string): Observable<PaymentCheckoutResponse> {
    const params = { order_id: orderId };

    return this.http.get<PaymentCheckoutResponse>(`${environment.API_BASE_URL}checkout`, { params });
  }
}
