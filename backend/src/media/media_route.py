from banditsdk.http.web_result import WebResult
from fastapi import APIRouter, Query, Path, Depends
from pydantic import Required

from common.tags import Tags
from database.session_manager import get_session_manager
from media.media_repo import MediaRepository
from media.media_model import MediaModel

router = APIRouter(tags=[Tags.MEDIA], prefix="/media")


@router.get("/page", response_model=WebResult[MediaModel])
def get_media_page(offset: int = Query(Required, ge=0),
                   limit: int = Query(Required, ge=0),
                   session_manager=Depends(get_session_manager)) -> WebResult:
    repo = MediaRepository(session_manager)
    data = repo.get_media_page(offset, limit)
    return data


@router.get("/{id}")
def get_media_by_id(id: int = Path(Required, ge=0),
                    session_manager=Depends(get_session_manager)) -> WebResult:
    repo = MediaRepository(session_manager)
    return repo.get_by_id(id)
