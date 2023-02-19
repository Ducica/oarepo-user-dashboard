from pathlib import Path
from invenio_access.permissions import system_identity

from oarepo_vocabularies.fixtures.fixtures import PrioritizedVocabulariesFixtures

from invenio_vocabularies.records.api import Vocabulary
from invenio_vocabularies.proxies import current_service


def test_complex_import(app, db, cache, vocab_cf):
    fixture = PrioritizedVocabulariesFixtures(
        system_identity,
        pkg_data_folder=Path(__file__).parent / "complex-data",
        delay=False,
    )
    fixture.load()
    Vocabulary.index.refresh()