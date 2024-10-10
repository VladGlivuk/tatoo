import logging

from settings import settings

log_level: dict = {
    "CRITICAL": 50,
    "ERROR": 40,
    "WARNING": 30,
    "INFO": 20,
    "DEBUG": 10,
    "NOTSET": 0
}

FORMAT = '%(asctime)s:%(name)s:%(levelname)s - %(message)s'
logging.basicConfig(
    format=FORMAT,
    level=log_level.get(settings.log_level, 10)
)


def get_logger():
    logger = logging.getLogger(__name__)
    return logger
