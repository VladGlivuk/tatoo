from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from fastapi import APIRouter, Query, Path, Depends
from pydantic import Required

from common.tags import Tags
from database.session_manager import get_session_manager
from product.product_repo import ProductRepository

router = APIRouter(tags=[Tags.PRODUCT], prefix="/product")


@router.get("s/category/{category_id}", description="Get product-page method.")
def get_product_page(
        category_id: int = Path(Required, ge=0),
        offset: int = Query(None, ge=0),
        limit: int = Query(None, ge=0),
        session_manager=Depends(get_session_manager)
) -> WebResult:
    if isinstance(offset, type(limit)):
        repo = ProductRepository(session_manager)
        return repo.get_product_page(category_id, offset, limit)
    return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value, detail="Error. Wrong query.")


@router.get("/{id}", description="Get specific product by product_id.")
def get_product_by_id(id: int = Path(Required, ge=0), session_manager=Depends(get_session_manager)) -> WebResult:
    repo = ProductRepository(session_manager)
    return repo.get_by_id(id)


@router.get("s/by_category/{category_id}")
def get_product_by_category_id(
        category_id: int = Path(Required, ge=0),
        session_manager=Depends(get_session_manager)
) -> WebResult:
    repo = ProductRepository(session_manager)
    return repo.get_by_category(category_id)
