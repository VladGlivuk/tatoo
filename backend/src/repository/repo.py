from typing import Callable

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from banditsdk.common.session import SessionManager
from pydantic import BaseModel

from common.log_helper import get_logger


class BaseRepository:
    db_model: Callable

    def __init__(self, session_manager: SessionManager, db_model):
        self.session = session_manager.get_session()
        self.db_model = db_model
        self.logger = get_logger()

    def create(self, dto_object: BaseModel) -> WebResult:
        new_db_object = self.db_model(**dto_object.dict())
        self.session.add(new_db_object)
        try:
            self.session.commit()
        except Exception as error:
            self.logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value,
                                     detail=str(error))
        return WebResult.success(data=f"Objet {new_db_object} has been successfully created.")

    def get_by_id(self, id: int) -> WebResult:
        db_object = self.session.query(self.db_model).get(id)
        if db_object:
            return WebResult.success(data=db_object)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail=f"No such object with id - {id}.")

    def get_all(self) -> WebResult:
        db_objects = self.session.query(self.db_model).all()
        if len(db_objects) > 0:
            return WebResult.success(data=db_objects)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail=f"No such objects.")

    def edit_by_id(self, id: int, data: BaseModel) -> WebResult:
        db_object = self.session.query(self.db_model).get(id)
        if not db_object:
            return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                     detail=f"No such object to update.")
        self.session.query(self.db_model).filter(self.db_model.id == id).update(data.dict())
        try:
            self.session.commit()
        except Exception as error:
            self.logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value, detail=str(error))
        return WebResult.success()

    def delete_by_id(self, id: int) -> WebResult:
        db_object = self.session.query(self.db_model).get(id)
        if not db_object:
            return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                     detail=f"No such object to delete.")
        self.session.delete(db_object)
        try:
            self.session.commit()
        except Exception as error:
            self.logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value,
                                     detail=str(error))
        return WebResult.success(data=f"Object {db_object} has been successfully deleted.")

    def __del__(self):
        self.session.close()
