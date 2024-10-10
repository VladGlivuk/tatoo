from fastapi.responses import FileResponse
import uvicorn

from api.app import app

from settings import settings

APP_HOST: str = settings.app_host
APP_PORT: int = settings.app_port


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("src/static/img/favicon.ico")


def app_run():
    uvicorn.run(app, host=APP_HOST, port=APP_PORT, reload=False)
    pass


if __name__ == '__main__':
    app_run()

