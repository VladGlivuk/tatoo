from api.admin_panel.admin_router import admin_panel

from settings import settings

APP_HOST: str = settings.app_host
ADMIN_PORT: int = settings.admin_port
APP_DEBUG_MODE: bool = settings.app_debug_mode


def run_admin_panel():
    admin_panel.run(host=APP_HOST, port=ADMIN_PORT, debug=APP_DEBUG_MODE)
    pass


if __name__ == '__main__':
    run_admin_panel()
