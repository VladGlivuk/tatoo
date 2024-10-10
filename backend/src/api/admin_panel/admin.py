import os.path

from flask import redirect, url_for, Flask
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_admin.menu import MenuLink
from flask_login import LoginManager, current_user

from api.admin_panel.admin_repo import AdminRepository
from database.session_manager import get_session_manager
from faq.faq_schema import FaqSchema
from news.news_schema import NewsSchema
from product.product_schema import ProductSchema
from pricelist.pricing_schema import PricingSchema
from category.category_schema import CategorySchema
from media.media_schema import MediaSchema
from settings import settings
from transaction.transaction_schema import TransactionSchema


admin_panel = Flask("admin_panel", template_folder="src/templates", static_folder="src/static")
# admin_panel.add_url_rule("/favicon.ico", redirect_to=url_for('static/img', filename="favicon.ico"))

admin_panel.config["SECRET_KEY"] = settings.app_secret_key

session = get_session_manager().get_session()
login = LoginManager(admin_panel)


# @admin_panel.route("/favicon.ico")
# def favicon():
#     return send_from_directory(
#     os.path.join(admin_panel.root_path, "static"),
#     "favicon.ico", mimetype="img/favicon.ico"
# )


@login.user_loader
def load_admin(id: int):
    session_manager = get_session_manager()
    repo = AdminRepository(session_manager)
    user = repo.get_by_id(id)
    if user.is_success():
        return user.data
    return user


class AdminView(ModelView):
    form_excluded_columns = ('products',)

    def is_accessible(self):
        return current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for("login"))


class HomeAdminView(AdminIndexView):
    def is_accessible(self):
        return current_user.is_authenticated

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for("login"))


admin = Admin(admin_panel, name="MHT: Admin Panel", index_view=HomeAdminView(), template_mode="bootstrap4")
admin.add_view(AdminView(TransactionSchema, session, name="Transactions (Read Only)"))
admin.add_view(AdminView(MediaSchema, session, name="Media"))
admin.add_view(AdminView(NewsSchema, session, name="News"))
admin.add_view(AdminView(FaqSchema, session, name="FAQ"))
admin.add_view(AdminView(CategorySchema, session, name="Category"))
admin.add_view(AdminView(ProductSchema, session, name="Product"))
admin.add_view(AdminView(PricingSchema, session, name="Pricing"))
admin.add_link(MenuLink(name="Logout", category="", url="/admin/logout"))
