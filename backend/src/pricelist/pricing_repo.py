from typing import List

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from fastapi import Depends
from sqlalchemy import desc

from database.session_manager import get_session_manager
from repository.repo import BaseRepository
from repository.page_detail import Page
from pricelist.pricing_schema import PricingSchema
from pricelist.pricing_model import PricingModel


class PricingRepository(BaseRepository):
    def __init__(self, session_manager=Depends(get_session_manager)):
        super().__init__(session_manager, PricingSchema)
        self.page = Page()

    def get_pricing(self) -> WebResult:
        pricing: list = self.session.query(self.db_model).all()
        if pricing:
            pricing: list = [PricingModel.from_orm(item) for item in pricing]
            self.page.total = self.session.query(self.db_model).count()
            return WebResult.success(data=pricing, detail=self.page)

    def get_pricing_page(self, m_offset: int, m_limit: int) -> WebResult:
        page: list = self.session.query(self.db_model) \
            .order_by(desc(self.db_model.id)).offset(m_offset * m_limit).limit(m_limit).all()
        if page:
            page: list = [PricingModel.from_orm(item) for item in page]
            self.page.total = self.session.query(self.db_model).count()
            if self.page.total % m_limit != 0:
                pages: int = self.page.total // m_limit + 1
            else:
                pages: int = self.page.total // m_limit
            self.page.pages = [i for i in range(1, pages+1)]
            return WebResult.success(data=page, detail=self.page)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail="No such page(s).")

