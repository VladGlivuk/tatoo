from banditsdk.http.web_result import WebResult
from fastapi import Query, Path, Depends
from fastapi.routing import APIRouter
from pydantic import Required

from common.tags import Tags
from database.session_manager import get_session_manager
from news.news_repo import NewsRepository


router = APIRouter(tags=[Tags.NEWS], prefix="/news")


@router.get("/")
def get_news_page(offset: int = Query(Required, ge=0),
                  limit: int = Query(Required, ge=0),
                  session_manager=Depends(get_session_manager)) -> WebResult:
    repo = NewsRepository(session_manager)
    return repo.get_news_page(offset, limit)


@router.get("/{id}")
def get_news_by_id(id: int = Path(Required, ge=0), session_manager=Depends(get_session_manager)) -> WebResult:
    repo = NewsRepository(session_manager)
    return repo.get_by_id(id)
