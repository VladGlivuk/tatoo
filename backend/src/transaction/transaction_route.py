import uuid
from typing import Union

from fastapi import Depends, Query

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from fastapi import APIRouter, Body
from pydantic import Required, UUID4

from common.log_helper import get_logger
from common.tags import Tags
from database.session_manager import get_session_manager
from product.product_repo import ProductRepository
from service.payment_service.payment_proccessor import PaymentLiqpay
from service.transaction_callback_service import process_payment_callback
from service.transaction_notify_service import transaction_manager_notification
from transaction.transaction_aggregator import transaction_data_tg_aggregator
from transaction.transaction_model import TransactionModel, DataCollectorModel
from transaction.transaction_repo import TransactionRepository


router = APIRouter(tags=[Tags.TRANSACTION], prefix="/checkout")
logger = get_logger()


@router.post("/registrate/", description="Returns either order_id or an error.")
def registrate_transaction(user: DataCollectorModel = Body(Required),
                           product_repo: ProductRepository = Depends(),
                           session_manager=Depends(get_session_manager)):
    repo = TransactionRepository(session_manager)
    product = product_repo.get_by_id(user.product_id)
    if product:
        new_order_id = uuid.uuid4().hex
        return repo.registrate_new_transaction(user, new_order_id)
    return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND, detail='wrong product id')


@router.get("/", description="Returns either check_out url or an error.")
def get_checkout_url(order_id: UUID4 = Query(Required),
                     liqpay_service: PaymentLiqpay = Depends(),
                     session_manager=Depends(get_session_manager)):
    repo = TransactionRepository(session_manager)
    customer_data = repo.get_transaction_by_order_id(order_id.hex)
    if customer_data.is_success():
        checkout_url = liqpay_service.generate_new_url_for_pay(order_id.hex, customer_data.data.product.price, customer_data.data.product.title)
        if checkout_url.is_success():
            return checkout_url.data
        return checkout_url


@router.post("/receive_checkout_callback")
def get_checkout_response(callback: Union[str, bytes] = Body(Required), session_manager=Depends(get_session_manager)):
    repo = TransactionRepository(session_manager)
    callback_status = process_payment_callback(callback)
    if callback_status.is_success():
        try:
            telegram_notification = transaction_data_tg_aggregator(callback_status)
            transaction_manager_notification(telegram_notification)
            repo.complete_transaction_data(callback_status.data['order_id'], callback_status.data)
            return WebResult.success()
        except Exception as error:
            logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_402_PAYMENT_REQUIRED.value,
                                     detail="something wrong with completing transaction")
    return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value, detail="cant handle a transaction")


# @router.get("/get_checkout_response", deprecated=True)
# def get_checkout_response(order_id: int):
#     liqpay_service = PaymentLiqpay()
#     order_status = liqpay_service.get_order_status_from_liqpay(order_id)
#     if order_status.is_success():
#         return order_status.data
#     return order_status
