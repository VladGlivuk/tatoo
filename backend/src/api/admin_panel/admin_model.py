from banditsdk.http.status import http_status as status
from banditsdk.http.web_result import WebResult
from pydantic import BaseModel, Required, Field, validator, ValidationError

from config import login_config as conf
from common.log_helper import get_logger


class AdminLoginModel(BaseModel):
    login: str = Field(Required, min_length=conf.login_min_length, max_length=conf.login_max_length)
    password: str = Field(Required, min_length=conf.password_min_length, max_length=conf.password_max_length)

    @validator("login", "password")
    def validate_fields(value):
        restricted_chars: list = [r"/", r"#", r"'"]
        if r"--" in value:
            raise ValidationError("[!] SQL Injection Attempt.")
        for char in value:
            if char in restricted_chars:
                raise ValidationError("[!] SQL Injection Attempt.")
        return value

    class Config:
        orm_mode = True


class LoginValidation:
    account_data = None

    def __init__(self):
        self.logger = get_logger()

    def is_valid_credentials(self, request) -> WebResult[AdminLoginModel]:
        try:
            self.account_data = AdminLoginModel(
                login=request.form['login'],
                password=request.form['password']
            )
            return WebResult.success(self.account_data)
        except ValidationError as error:
            self.logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_403_FORBIDDEN.value,
                                     detail="login/password - Validation error.")
        except Exception as error:
            self.logger.error(str(error))
            return WebResult.failure(status_code=status.HTTP_400_BAD_REQUEST.value,
                                     detail="Unhandled error in login validation.")
