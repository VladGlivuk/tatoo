from typing import List

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from fastapi import Depends, Query
from pydantic import Required
from sqlalchemy import desc

from database.session_manager import get_session_manager
from repository.repo import BaseRepository
from faq.faq_schema import FaqSchema
from faq.faq_model import FaqModel


class FaqRepository(BaseRepository):
    def __init__(self, session_manager=Depends(get_session_manager)):
        super().__init__(session_manager, FaqSchema)

    def get_faq_page(self,
                     m_offset: int = Query(Required, ge=0),
                     m_limit: int = Query(Required, ge=0)
                     ) -> WebResult[List[FaqSchema]]:
        page: list = self.session.query(self.db_model).order_by(desc(self.db_model.id))\
            .offset(m_offset * m_limit).limit(m_limit).all()
        if len(page) > 0:
            page: list = [FaqModel.from_orm(item) for item in page]
            return WebResult.success(page)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail="No such page(s).")
