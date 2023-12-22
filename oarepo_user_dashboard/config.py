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




OAREPO_VOCABULARIES_HIERARCHY_CF = [
    hierarchy.HierarchyLevelCF("level"),
    hierarchy.HierarchyTitleCF("title"),
    hierarchy.HierarchyAncestorsCF("ancestors", multiple=True),
    hierarchy.HierarchyAncestorsOrSelfCF("ancestors_or_self", multiple=True),
    KeywordCF("parent"),
]


OAREPO_DASHBOARD_TYPE_SERVICE = DashboardTypeService
OAREPO_DASHBOARD_TYPE_SERVICE_CONFIG = DashboardTypeServiceConfig

OAREPO_DASHBOARD_TYPE_RESOURCE = DashboardTypeResource
OAREPO_DASHBOARD_TYPE_RESOURCE_CONFIG = DashboardTypeResourceConfig

DATASTREAMS_CONFIG_GENERATOR_VOCABULARIES = vocabularies_generator

DATASTREAMS_READERS = {"vocabulary": VocabularyReader}

DATASTREAMS_WRITERS = {"vocabulary": VocabularyWriter}

