import requests

from settings import settings
from common.log_helper import get_logger

URL = "https://api.telegram.org/"
logger = get_logger()


def transaction_manager_notification(data: str) -> None:
    params = {
        "chat_id": settings.manager_chat_id,
        "text": data,
        "parse_mode": "HTML"
    }
    response = requests.post(f"{URL}bot{settings.bot_token}/sendMessage", params=params)
    logger.info(f"sendMessage in Telegram successful: {response.text}. Status: {response.status_code}")