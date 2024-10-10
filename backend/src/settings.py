from pydantic import BaseSettings


class Settings(BaseSettings):
    app_host: str
    app_port: int
    admin_port: int
    app_debug_mode: bool
    log_level: str
    app_secret_key: str
    bot_token: str
    manager_chat_id: int
    liqpay_public_key: str
    liqpay_private_key: str
    result_url: str
    callback_url: str
    api_version: str
    cors_origin: str

    class Config:
        env_file = ".env"


class PostgresSettings(BaseSettings):
    pg_db_host: str
    pg_db_port: int
    pg_db_username: str
    pg_db_password: str
    pg_db_name: str

    @property
    def postgres(self):
        return f"postgresql+psycopg2://{self.pg_db_username}:{self.pg_db_password}" \
               f"@{self.pg_db_host}:{self.pg_db_port}/{self.pg_db_name}"

    class Config:
        env_file = ".env"


settings = Settings()
pg_settings = PostgresSettings()
