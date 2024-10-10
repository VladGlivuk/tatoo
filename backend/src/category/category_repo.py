from fastapi import Depends

from database.session_manager import get_session_manager
from repository.repo import BaseRepository
from category.category_schema import CategorySchema


class CategoryRepository(BaseRepository):
    def __init__(self, session_manager=Depends(get_session_manager)):
        super().__init__(session_manager, CategorySchema)
