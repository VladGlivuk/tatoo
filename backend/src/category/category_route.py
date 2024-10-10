from banditsdk.http.web_result import WebResult
from fastapi import APIRouter, Path, Depends
from pydantic import Required

from category.category_repo import CategoryRepository
from category.category_schema import CategorySchema
from common.tags import Tags
from database.session_manager import get_session_manager


router = APIRouter(tags=[Tags.CATEGORY], prefix="/category")


@router.get("/")
def get_all_categories(session_manager=Depends(get_session_manager)) -> WebResult:
    repo = CategoryRepository(session_manager)
    return repo.get_all()


@router.get("/{id}")
def get_category_by_id(id: int = Path(Required, ge=0), session_manager=Depends(get_session_manager)) -> WebResult:
    repo = CategoryRepository(session_manager)
    return repo.get_by_id(id)


@router.get("/products/{id}", description="Get all products which included in category (by id)")
def get_products_by_category_id(id: int = Path(Required, ge=0), session_manager=Depends(get_session_manager)) -> WebResult:
    repo = CategoryRepository(session_manager)
    result = repo.get_by_id(id)
    if result.is_success():
        return WebResult.success(result.data.products)
    return result
