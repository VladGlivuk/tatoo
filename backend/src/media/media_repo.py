from typing import List

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from fastapi import Depends
from sqlalchemy import desc

from database.session_manager import get_session_manager
from media.media_model import MediaModel
from repository.repo import BaseRepository
from repository.page_detail import Page
from media.media_schema import MediaSchema


class MediaRepository(BaseRepository):
    def __init__(self, session_manager=Depends(get_session_manager)):
        self.page = Page()
        super().__init__(session_manager, MediaSchema)

    def get_media_page(self, m_offset: int, m_limit: int) -> WebResult[List[MediaSchema]]:
        page: list = self.session.query(self.db_model).order_by(desc(self.db_model.id))\
            .offset(m_offset * m_limit).limit(m_limit).all()
        if len(page) > 0:
            page: list = [MediaModel.from_orm(item) for item in page]
            self.page.total = self.session.query(self.db_model).count()
            if self.page.total % m_limit != 0:
                pages: int = self.page.total // m_limit + 1
            else:
                pages: int = self.page.total // m_limit
            self.page.pages = [i for i in range(1, pages+1)]
            return WebResult.success(data=page, detail=self.page)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail="No such page(s).")
