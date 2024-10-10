from sqlalchemy import and_
from banditsdk.http import http_status as status
from banditsdk.http.web_result import WebResult
from banditsdk.common.session import SessionManager

from api.admin_panel.admin_model import AdminLoginModel
from api.admin_panel.admin_schema import AdminSchema
from common.log_helper import get_logger


class AdminRepository:
    def __init__(self, session_manager: SessionManager):
        self.session = session_manager.get_session()
        self.logger = get_logger()
        self.db_model = AdminSchema

    def get_by_id(self, id: int) -> WebResult:
        admin = self.session.query(self.db_model).get(id)
        if admin:
            return WebResult.success(admin)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail="No such ID.")

    def get_by_login(self, login: str) -> WebResult:
        admin = self.session.query(self.db_model).filter(self.db_model.login == login).first()
        if admin:
            return WebResult.success(admin)
        return WebResult.failure(status_code=status.HTTP_404_NOT_FOUND.value,
                                 detail=f"No such account.")

    def __del__(self):
        self.session.close()
