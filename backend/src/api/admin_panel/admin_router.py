from flask import request, render_template, redirect, flash, url_for
from flask_login import login_user, logout_user

from api.admin_panel.admin import admin_panel
from api.admin_panel.admin_auth import AdminAuth
from api.admin_panel.admin_model import LoginValidation
from database.session_manager import get_session_manager


# OPTIONAL TODO: FLASH ERRORS.
@admin_panel.route("/admin/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session_manager = get_session_manager()
        user_to_login = LoginValidation().is_valid_credentials(request)
        if user_to_login.is_failure():
            flash("Invalid login or password", category="error")
            return redirect("/admin/login")
        if user_to_login.success():
            auth_service = AdminAuth(session_manager)
            auth_user = auth_service.get_access(user_to_login.data, request)
            if auth_user.is_success():
                login_user(auth_user.data)
                return redirect("/admin")
            elif auth_user.is_failure():
                flash(auth_user.detail, category="error")
                return redirect("/admin/login")
    return render_template("admin/admin-login.html")


@admin_panel.route("/admin/logout")
def logout():
    logout_user()
    return redirect("/admin/login")


@admin_panel.route("/")
def admin_redirect():
    return redirect("/admin/login")
