from flask import g
from flask_resources import from_conf, request_parser, resource_requestctx
from invenio_records_resources.resources.records.resource import (
    request_read_args,
    request_view_args,
)
from oarepo_ui.resources.resource import RecordsUIResource
from invenio_records_resources.services import LinksTemplate


request_vocabulary_args = request_parser(
    from_conf("request_vocabulary_type_args"), location="view_args"
)


class InvenioVocabulariesUIResource(RecordsUIResource):
    @request_read_args
    @request_view_args
    @request_vocabulary_args
    def detail(self):
        return super().detail()

    @request_read_args
    @request_view_args
    @request_vocabulary_args
    def export(self):
        return super().export()

    @request_read_args
    @request_view_args
    @request_vocabulary_args
    def search(self):
        return super().search()

    # TODO: !IMPORTANT!: needs to be enabled before production deployment
    # @login_required
    @request_read_args
    @request_view_args
    @request_vocabulary_args
    def create(self):
        return super().create()

    # TODO: !IMPORTANT!: needs to be enabled before production deployment
    # @login_required
    @request_read_args
    @request_view_args
    @request_vocabulary_args
    def edit(self):
        return super().edit()

    def _get_record(self, resource_requestctx):
        return self.api_service.read(
            g.identity,
            (
                resource_requestctx.view_args["vocabulary_type"],
                resource_requestctx.view_args["pid_value"],
            ),
        )

    def empty_record(self, resource_requestctx, **kwargs):
        record = super().empty_record(resource_requestctx=resource_requestctx)
        record["type"] = resource_requestctx.view_args["vocabulary_type"]
        return record

    def expand_detail_links(self, identity, record):
        """Get links for this result item."""
        tpl = LinksTemplate(
            self.config.ui_links_item,
            {
                "url_prefix": self.config.url_prefix,
                "vocabulary_type": resource_requestctx.view_args["vocabulary_type"],
            },
        )
        return tpl.expand(identity, record)

    def expand_search_links(self, identity, pagination, args):
        """Get links for this result item."""
        tpl = LinksTemplate(
            self.config.ui_links_search,
            {
                "config": self.config,
                "url_prefix": self.config.url_prefix,
                "vocabulary_type": resource_requestctx.view_args["vocabulary_type"],
                "args": args,
            },
        )
        return tpl.expand(identity, pagination)
