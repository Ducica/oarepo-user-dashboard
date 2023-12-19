from invenio_base.utils import obj_or_import_string
from oarepo_ui.resources import UIResourceConfig


class VocabularyTypeUIResourceConfig(UIResourceConfig):
    url_prefix = "/vocabularies"
    blueprint_name = "dashboard_type_app"
    ui_serializer_class = (
        "oarepo_user_dashboard.resources.ui.VocabularyTypeUIJSONSerializer"
    )
    api_service = "dashboard_type"
    layout = "dashboard"

    templates = {
        "list": {
            "layout": "oarepo_user_dashboard_ui/VocabulariesList.jinja",
        }
    }

    routes = {"list": "/"}

    @property
    def ui_serializer(self):
        return obj_or_import_string(self.ui_serializer_class)()
