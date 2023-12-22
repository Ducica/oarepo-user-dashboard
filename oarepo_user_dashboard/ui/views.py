from oarepo_user_dashboard.ui.proxies import current_ui


def create_blueprint(app):
    """Blueprint for the routes and resources provided by current ui's resource."""
    with app.app_context():
        app.extensions["oarepo_ui"].register_resource(current_ui.resource)
        return current_ui.resource.as_blueprint()


def create_dashboard_type_blueprint(app):
    with app.app_context():
        print(current_ui.type_resource, "TYPE RESOURCE DASHBOARD")
        app.extensions["oarepo_ui"].register_resource(current_ui.type_resource)
        return current_ui.type_resource.as_blueprint()
