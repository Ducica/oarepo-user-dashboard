from invenio_records_resources.services.custom_fields.text import KeywordCF

from oarepo_user_dashboard.fixtures import (
    VocabularyReader,
    VocabularyWriter,
    vocabularies_generator,
)
from oarepo_user_dashboard.resources.dashboard_type import (
    DashboardTypeResource,
    DashboardTypeResourceConfig,
)
from oarepo_user_dashboard.services.config import DashboardTypeServiceConfig
from oarepo_user_dashboard.services.custom_fields import hierarchy
from oarepo_user_dashboard.services.permissions import VocabulariesPermissionPolicy
from oarepo_user_dashboard.services.service import DashboardTypeService

OAREPO_VOCABULARIES_PERMISSIONS_PRESETS = {"vocabularies": VocabulariesPermissionPolicy}

INVENIO_VOCABULARY_TYPE_METADATA = {
    # etc.
    # "affilliations": {
    #    "authority": <authority service class>
    # },
    # "grants": {
    #    "authority": <authority service class>
    # },
    # "languages": {
    #     "name": {
    #         "cs": "jazyky",
    #         "en": "languages",
    #     },
    #     "description": {
    #         "cs": "slovnikovy typ ceskeho jazyka.",
    #         "en": "czech language vocabulary type.",
    #     },
    #     "hierarchical": False,
    #     "props": {...},
    #     "dump_options": True
    # },
    # "organisms": {
    #    "authority": <authority service class>
    # }
}

OAREPO_VOCABULARIES_HIERARCHY_CF = [
    hierarchy.HierarchyLevelCF("level"),
    hierarchy.HierarchyTitleCF("title"),
    hierarchy.HierarchyAncestorsCF("ancestors", multiple=True),
    hierarchy.HierarchyAncestorsOrSelfCF("ancestors_or_self", multiple=True),
    KeywordCF("parent"),
]

OAREPO_VOCABULARIES_SORT_CF = []

OAREPO_VOCABULARIES_SUGGEST_CF = []

OAREPO_VOCABULARIES_CUSTOM_CF = []

OAREPO_VOCABULARY_TYPE_SERVICE = DashboardTypeService
OAREPO_VOCABULARY_TYPE_SERVICE_CONFIG = DashboardTypeServiceConfig

OAREPO_VOCABULARY_TYPE_RESOURCE = DashboardTypeResource
OAREPO_VOCABULARY_TYPE_RESOURCE_CONFIG = DashboardTypeResourceConfig

DATASTREAMS_CONFIG_GENERATOR_VOCABULARIES = vocabularies_generator

DATASTREAMS_READERS = {"vocabulary": VocabularyReader}

DATASTREAMS_WRITERS = {"vocabulary": VocabularyWriter}

VOCABULARIES_FACET_CACHE_SIZE = 2048
VOCABULARIES_FACET_CACHE_TTL = 60 * 24 * 24
