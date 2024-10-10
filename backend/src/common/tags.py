from enum import Enum


class Tags(str, Enum):
    INDEX = 'Index'
    FAQ = "FAQ"
    MEDIA = "Media"
    NEWS = "News"
    CATEGORY = "Category"
    PRODUCT = "Product"
    TRANSACTION = "Transaction"
    PRICE_LIST = "Price list"
