from banditsdk.http.web_result import WebResult
from fastapi import APIRouter, Query, Path, Depends
from pydantic import Required

from common.tags import Tags
from database.session_manager import get_session_manager
from faq.faq_repo import FaqRepository


router = APIRouter(tags=[Tags.FAQ], prefix="/faq")


@router.get("/")
def get_faq_page(offset: int = Query(Required, ge=0),
                 limit: int = Query(Required, ge=0),
                 session_manager=Depends(get_session_manager)) -> WebResult:
    repo = FaqRepository(session_manager)
    return repo.get_faq_page(offset, limit)


@router.get("/{id}/")
def get_faq_by_id(id: int = Path(Required, ge=0), session_manager=Depends(get_session_manager)) -> WebResult:
    repo = FaqRepository(session_manager)
    return repo.get_by_id(id)
