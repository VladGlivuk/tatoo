from fastapi import FastAPI

from starlette.middleware.cors import CORSMiddleware

from category.category_route import router as category_router
from product.product_route import router as product_router
from faq.faq_route import router as faq_router
from news.news_route import router as news_router
from media.media_route import router as media_router
from pricelist.pricing_route import router as price_router
from settings import settings
from transaction.transaction_route import router as transaction_router


app = FastAPI(
    title="MushHaveTattoo API",
    version=settings.api_version
)
# TODO:  allow_origins=[settings.cors_origin.split(",")],
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# gunicorn -w 4 --worker-class uvicorn.workers.UvicornWorker -b 127.0.0.1:8000 --chdir /home/angrydanny/Desktop/Python/Projects/MHTweb/mhtWebsite-master/src --reload --timeout 900 main1:admin_panel


app.include_router(category_router)
app.include_router(product_router)
app.include_router(faq_router)
app.include_router(news_router)
app.include_router(media_router)
app.include_router(transaction_router)
app.include_router(price_router)
