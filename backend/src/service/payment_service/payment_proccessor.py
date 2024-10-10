from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from liqpay import LiqPay
import requests
from pydantic import UUID4

from settings import settings
from common.log_helper import get_logger


class PaymentLiqpay:
    def __init__(self):
        self.liqpay = LiqPay(settings.liqpay_public_key, settings.liqpay_private_key)
        self.data_storage: dict = {
            "version": "3",
            "public_key": settings.liqpay_public_key
        }
        self.logger = get_logger()

    def generate_new_url_for_pay(self, order_id: UUID4, amount, text="") -> WebResult:
        """
        Receiving data from payment service.
        :param order_id: unique id for specific payment
        :param amount: price for checkout
        :param text: comment for customer
        :return: url of checkout
        """
        data = {key: value for key, value in self.data_storage.items()}

        data["action"] = "pay"
        data["amount"] = str(amount)
        data["currency"] = "UAH"
        data["language"] = "uk"
        data["description"] = f"MHT - Оплата замовлення на сайті. {text}"
        data["order_id"] = order_id
        data["result_url"] = settings.result_url
        data["server_url"] = settings.callback_url
        data_to_sign = self.liqpay.data_to_sign(data)
        params = {
            "data": data_to_sign,
            "signature": self.liqpay.cnb_signature(data)
        }
        response = None
        try:
            response = requests.post("https://www.liqpay.ua/api/3/checkout", data=params)
            if response.status_code == 200:
                return WebResult.success(data=response.url, status_code=status.HTTP_307_TEMPORARY_REDIRECT.value)
            else:
                self.logger.error(f"[$] Incorrect status code of payment. data={data}, params={params}")
                return WebResult.failure(status_code=status.HTTP_401_UNAUTHORIZED.value,
                                         detail=f"Payment status: {response.status_code}")

        except Exception as error:
            self.logger.error(f"[$] Error from liqpay: {str(error)}")
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value,
                                     detail=f"Liqpay payment error: {str(error)}")

    def get_order_status_from_liqpay(self, order_id) -> WebResult:
        data = {key: value for key, value in self.data_storage.items()}
        data["action"] = "status"
        data["order_id"] = order_id
        response = self.liqpay.api("request", data)
        if response.get("status") == "error":
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value,
                                     detail=f"Error with payment check. Code: {response.get('err_code')}."
                                            f" Description: {response.get('err_description')}")
        if response.get("action") == "pay":
            if response.get("public_key") == settings.liqpay_public_key:
                return WebResult.success(response)
        return WebResult.failure(status_code=status.HTTP_401_UNAUTHORIZED.value,
                                 detail="Get order status: action != pay or public_key invalid")
