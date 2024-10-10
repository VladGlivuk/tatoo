from banditsdk.common.session import SessionManager

from database.base import session_local


def get_session_manager():
    return SessionManager(session_local)
