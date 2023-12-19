from flask import current_app
from werkzeug.local import LocalProxy

current_ui = LocalProxy(lambda: current_app.extensions["oarepo_user_dashboard_ui"])

"""Proxy to the instantiated ui extension."""
