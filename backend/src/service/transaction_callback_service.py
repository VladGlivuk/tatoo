import base64
import json
from typing import Union
from urllib import parse

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult

from common.log_helper import get_logger
from service.payment_service.payment_proccessor import PaymentLiqpay
from settings import settings


logger = get_logger()


def process_payment_callback(reqeust_data: Union[str, bytes]):
    payment_data = reqeust_data
    liqpay_processor = PaymentLiqpay()
    if isinstance(payment_data, bytes):
        payment_data: str = payment_data.decode("utf-8")
    # payment_data: str = payment_data.replace('2%2F', '/').replace('%2B', '+').replace('%3D', '=')
    payment_data: str = parse.unquote(payment_data)
    payment_data_dict: dict = {}
    for item in payment_data.split("&"):
        try:
            key, value = item.split("=", 1)
            payment_data_dict[key] = value
        except Exception as error:
            logger.error(f"Parsed text for param hasn`t '='. Error: {str(error)}")
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value,
                                     detail="Parsing data error.")
    if not payment_data_dict.get("signature"):
        logger.info(f"Server request hasn`t 'signature' param. Request data: {reqeust_data}")
        return WebResult.failure(status_code=status.HTTP_407_PROXY_AUTHENTICATION_REQUIRED.value,
                                 detail="Empty payment signature.")

    original_sign = liqpay_processor.liqpay.str_to_sign(settings.liqpay_private_key + payment_data_dict["data"] +
                                                        settings.liqpay_private_key)
    if original_sign != payment_data_dict["signature"]:
        logger.warning(f"Signatures not equal. Original signature: {original_sign}"
                       f" Request signature: {payment_data_dict['signature']}"
                       f" Data for sign: {payment_data_dict['data']}")
        return WebResult.failure(status_code=status.HTTP_407_PROXY_AUTHENTICATION_REQUIRED.value,
                                 detail="Invalid payment signature.")

    data_to_base64 = payment_data_dict["data"]
    data_decoded = base64.b64decode(data_to_base64).decode("utf-8")
    params = json.loads(data_decoded)

    return WebResult.success(params)
