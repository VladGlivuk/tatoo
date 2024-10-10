import uuid

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from fastapi import Depends
from pydantic import UUID4

from common.log_helper import get_logger
from database.session_manager import get_session_manager
from transaction.transaction_schema import TransactionSchema
from transaction.transaction_model import DataCollectorModel


class TransactionRepository:
    def __init__(self, session_manager=Depends(get_session_manager)):
        self.session = session_manager.get_session()
        self.logger = get_logger()
        self.db_model = TransactionSchema

    def registrate_new_transaction(self, data: DataCollectorModel, order_id: UUID4) -> WebResult:
        existed_transaction = self.session.query(self.db_model).filter(self.db_model.order_id == order_id).first()
        while existed_transaction:
            order_id = uuid.uuid4().hex
            existed_transaction = self.session.query(self.db_model).filter(
                self.db_model.order_id == order_id).first()
        new_transaction = self.db_model(**data.dict(), order_id=order_id)
        self.session.add(new_transaction)
        try:
            self.session.commit()
        except Exception as error:
            self.logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value,
                                     detail=f"Can`t registrate new transaction.")
        return WebResult.success(data=order_id)

    def get_transaction_by_order_id(self, order_id: UUID4) -> WebResult[TransactionSchema]:
        transaction = self.session.query(self.db_model).filter(self.db_model.order_id == order_id).first()
        if transaction:
            return WebResult.success(transaction)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail="No such transaction.")

    def complete_transaction_data(self, order_id: int, data: dict):
        # edit after success payment
        transaction = self.session.query(self.db_model).filter(self.db_model.order_id == order_id).first()
        if not transaction:
            return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                     detail=f"No such order with id - {order_id}.")
        transaction.transaction_data = data
        try:
            self.session.commit()
        except Exception as error:
            self.logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value, detail=str(error))
        return WebResult.success()

    def __del__(self):
        self.session.close()
