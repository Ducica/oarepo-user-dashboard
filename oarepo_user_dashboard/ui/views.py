from oarepo_user_dashboard.ui.proxies import current_ui
from flask_menu import current_menu
from flask_babelex import lazy_gettext as _




def create_blueprint(app):
    """Blueprint for the routes and resources provided by current ui's resource."""
    with app.app_context():
        app.extensions["oarepo_ui"].register_resource(current_ui.resource)
        app_blueprint=current_ui.resource.as_blueprint()
        
        @app_blueprint.before_app_first_request
        def init_menu():
            user_dashboard = current_menu.submenu("dashboard")
            user_dashboard.submenu("uploads").register(
                "oarepo_user_dashboard_ui.uploads",
                text=_("My uploads"),
                order=1,
            )
            
            user_dashboard.submenu("communities").register(
            "oarepo_user_dashboard_ui.communities",
            text=_("My communities"),
            order=2,
            )
            
            user_dashboard.submenu("requests").register(
            "oarepo_user_dashboard_ui.requests",
            text=_("My requests"),
            order=3,
            )
        return app_blueprint


def create_dashboard_type_blueprint(app):
    with app.app_context():
        app.extensions["oarepo_ui"].register_resource(current_ui.type_resource)
        return current_ui.type_resource.as_blueprint()
