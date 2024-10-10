from typing import Union

from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from flask import Response
from werkzeug.security import check_password_hash

from api.admin_panel.admin_model import AdminLoginModel
from api.admin_panel.admin_repo import AdminRepository
from common.log_helper import get_logger


# password123


class AdminAuth:
    __is_valid_login = False
    __is_valid_password = False

    def __init__(self, session_manager):
        self.logger = get_logger()
        # self.dto_model = model
        self.auth_repo = AdminRepository(session_manager)

    def get_access(self, credentials: AdminLoginModel, request) -> Union[WebResult, Response]:
        user: WebResult = self.auth_repo.get_by_login(credentials.login)
        if user.is_success():
            self.login_is_valid()
            self.check_password(user.data.password, credentials.password)
            if self.is_authenticated():
                self.logger.warning(f"[+] New logining detected. Login: {credentials.login}")
                return WebResult.success(data=user.data)
        self.password_is_invalid()
        self.login_is_invalid()
        self.logger.warning(f"[!] Failure attempt of login. Request: {request.headers}. Body: {request.data}."
                            f" Credentials: {credentials.login} - {credentials.password}")
        return WebResult.failure(status_code=status.HTTP_401_UNAUTHORIZED.value, detail="Access denied.")

    def password_is_valid(self) -> None:
        self.__is_valid_password = True

    def password_is_invalid(self) -> None:
        self.__is_valid_password = False

    def login_is_valid(self) -> None:
        self.__is_valid_login = True

    def login_is_invalid(self) -> None:
        self.__is_valid_login = False

    def is_authenticated(self) -> bool:
        return True if self.__is_valid_login and self.__is_valid_password else False

    def check_password(self, psw_hash, psw_plain) -> None:
        self.password_is_valid() if check_password_hash(psw_hash, psw_plain) else self.password_is_invalid()
