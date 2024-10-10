from typing import List

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from fastapi import Depends
from sqlalchemy import desc

from database.session_manager import get_session_manager
from repository.repo import BaseRepository
from repository.page_detail import Page
from product.product_schema import ProductSchema
from product.product_model import ProductModel


class ProductRepository(BaseRepository):
    def __init__(self, session_manager=Depends(get_session_manager)):
        super().__init__(session_manager, ProductSchema)
        self.page = Page()

    def get_by_category(self, category_id: int) -> WebResult[List[ProductSchema]]:
        products: list = self.session.query(self.db_model).filter(self.db_model.category_id == category_id).all()
        if len(products) > 0:
            return WebResult.success(data=products)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail=f"No such products in category with id - {category_id}.")

    def get_product_page(self, category_id: int, m_offset: int, m_limit: int) -> WebResult[List[ProductSchema]]:
        page: list = self.session.query(self.db_model) \
            .filter(self.db_model.category_id == category_id).order_by(desc(self.db_model.id)) \
            .offset(m_offset * m_limit).limit(m_limit).all()
        if len(page) > 0:
            page: list = [ProductModel.from_orm(item) for item in page]
            self.page.total = self.session.query(self.db_model).count()
            if self.page.total % m_limit != 0:
                pages: int = self.page.total // m_limit + 1
            else:
                pages: int = self.page.total // m_limit
            self.page.pages = [i for i in range(1, pages+1)]
            return WebResult.success(data=page, detail=self.page)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail="No such page(s).")
