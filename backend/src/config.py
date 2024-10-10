from dataclasses import dataclass


@dataclass
class UserConfig:
    username_min_length = 2
    username_max_length = 20
    phone_number_length = 13


@dataclass
class ProductConfig:
    title_min_length = 3
    title_max_length = 30
    description_min_length = 5
    description_max_length = 300


@dataclass
class NewsConfig:
    title_min_length = 1
    title_max_length = 30
    description_min_length = 5
    description_max_length = 300


@dataclass
class MediaConfig:
    title_min_length = 1
    title_max_length = 30
    description_min_length = 5
    description_max_length = 128


@dataclass
class LoginConfig:
    login_min_length = 4
    login_max_length = 20
    password_min_length = 6
    password_max_length = 60


@dataclass
class CategoryConfig:
    title_min_length = 1
    title_max_length = 30
    description_min_length = 5
    description_max_length = 128


@dataclass
class FaqConfig:
    question_min_length = 4
    question_max_length = 256
    answer_min_length = 4
    answer_max_length = 1024

# instances for imports are bellow


user_config = UserConfig()
product_config = ProductConfig()
news_config = NewsConfig()
media_config = MediaConfig()
login_config = LoginConfig()
category_config = CategoryConfig()
faq_config = FaqConfig()
