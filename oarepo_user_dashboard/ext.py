class OARepoDashboard(object):
    """OARepo extension of Invenio-Vocabularies."""

    def __init__(self, app=None):
        """Extension initialization."""
        self.type_resource = None
        self.type_service = None
        if app:
            self.init_app(app)

    def init_app(self, app):
        """Flask application initialization."""
        self.init_config(app)
        self.init_services(app)
        self.init_resource(app)
        app.extensions["oarepo-user-dashboard"] = self

    def init_services(self, app):
        """Initialize services."""
       
        self.type_service = app.config["OAREPO_DASHBOARD_TYPE_SERVICE"](
            config=app.config["OAREPO_DASHBOARD_TYPE_SERVICE_CONFIG"](),
        )

    def init_config(self, app):
        """Initialize configuration."""
        from . import config

        for k in dir(config):
            if k.startswith("OAREPO_DASHBOARD_"):
                app.config.setdefault(k, getattr(config, k))
            # if k.startswith("OAREPO_VOCABULARY_"):
            #     app.config.setdefault(k, getattr(config, k))
            # if k.startswith("DATASTREAMS_CONFIG_GENERATOR_"):
            #     app.config.setdefault(k, getattr(config, k))
            # elif k.startswith("DATASTREAMS_"):
            #     app.config.setdefault(k, {}).update(getattr(config, k))
            # if k.startswith("VOCABULARIES"):
            #     app.config.setdefault(k, getattr(config, k))
      


    def init_resource(self, app):
        """Initialize resources."""
        self.type_resource = app.config["OAREPO_DASHBOARD_TYPE_RESOURCE"](
            config=app.config["OAREPO_DASHBOARD_TYPE_RESOURCE_CONFIG"](),
            service=self.type_service,
        )
   
