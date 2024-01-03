import marshmallow as ma
from flask import current_app
from invenio_records_resources.services import Link, pagination_links
from oarepo_ui.resources.config import RecordsUIResourceConfig
from oarepo_ui.resources.links import UIRecordLink

from oarepo_user_dashboard.ui.resources.components.deposit import (
    DepositVocabularyOptionsComponent,
)
from oarepo_user_dashboard.ui.resources.components.search import VocabularySearchComponent
from oarepo_user_dashboard.ui.resources.components.vocabulary_ui_resource import (
    VocabularyRecordsComponent,
)


class VocabularyFormDepositVocabularyOptionsComponent(
    DepositVocabularyOptionsComponent
):
    always_included_vocabularies = ["languages"]

    def form_config(self, *, form_config, **kwargs):
        super().form_config(form_config=form_config, **kwargs)

        if "languages" not in form_config["vocabularies"]:
            form_config["vocabularies"]["languages"] = []

        if not form_config["vocabularies"]["languages"]:
            form_config["vocabularies"]["languages"] = [
                {"text": "English", "value": "en"}
            ]


class InvenioVocabulariesUIResourceConfig(RecordsUIResourceConfig):
    template_folder = "../templates"
    url_prefix = "/me/"
    blueprint_name = "oarepo_user_dashboard_ui"
    ui_serializer_class = (
        "oarepo_user_dashboard.resources.records.ui.VocabularyUIJSONSerializer"
    )
    api_service = "nr_documents"
    # layout = "oarepo_user_dashboard_ui"

    templates = {
        "uploads": {
            "layout": "oarepo_user_dashboard_ui/uploads.html",
        },
        "communities": {
            "layout": "oarepo_user_dashboard_ui/communities.html",
        },
       
    }
    
    def search_active_facets(self, api_config, identity):
        return [
            k
            for k in self.search_available_facets(api_config, identity).keys()
            # TODO: replace with a more generic `item.filterable` attribute check
            if not k.startswith("metadata_abstract")
        ]
    
        
    
    routes = {
        "uploads": "/uploads/",
        "communities": "/communities/",
        "search": "/<vocabulary_type>/",
        "detail": "/<vocabulary_type>/<pid_value>",
        "export": "/<vocabulary_type>/<pid_value>/export/<export_format>",
    }

    # components = [
    #     VocabularyRecordsComponent,
    #     VocabularyFormDepositVocabularyOptionsComponent,
    #     VocabularySearchComponent,
    # ]

    # request_vocabulary_type_args = {"vocabulary_type": ma.fields.Str()}

    # ui_links_item = {
    #     "self": UIRecordLink("{+ui}{+url_prefix}{vocabulary_type}/{id}"),
    #     "edit": UIRecordLink("{+ui}{+url_prefix}{vocabulary_type}/{id}/edit"),
    #     "search": UIRecordLink("{+ui}{+url_prefix}{vocabulary_type}/"),
    # }

    # @property
    # def ui_links_search(self):
    #     return {
    #         **pagination_links("{+ui}{+url_prefix}{vocabulary_type}/{?args*}"),
    #         "create": Link("{+ui}{+url_prefix}{vocabulary_type}/_new"),
    #     }

    # def vocabulary_props_config(self, vocabulary_type):
    #     return current_app.config.get("INVENIO_VOCABULARY_TYPE_METADATA", {}).get(
    #         vocabulary_type, {}
    #     )
