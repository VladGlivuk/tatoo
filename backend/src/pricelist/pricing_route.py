from banditsdk.http.web_result import WebResult
from fastapi import Depends
from fastapi.routing import APIRouter


from common.tags import Tags
from database.session_manager import get_session_manager
from pricelist.pricing_model import PricingModel
from pricelist.pricing_repo import PricingRepository


router = APIRouter(tags=[Tags.PRICE_LIST], prefix="/pricing")


@router.get("/", response_model=WebResult[PricingModel])
def get_price_list(session_manager=Depends(get_session_manager)) -> WebResult:
    repo = PricingRepository(session_manager)
    return repo.get_pricing()


@router.get("/get_page")
def get_price_list(offset: int, limit: int,
        session_manager=Depends(get_session_manager)) -> WebResult:
    repo = PricingRepository(session_manager)
    return repo.get_pricing_page(offset, limit)