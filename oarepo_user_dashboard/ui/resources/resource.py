from flask import g, render_template
from flask_resources import from_conf, request_parser, resource_requestctx, route
from flask_security import login_required
from invenio_records_resources.resources.records.resource import (
    request_read_args,
    request_view_args,
)
from functools import partial
from invenio_records_resources.services import LinksTemplate
from oarepo_ui.resources.resource import RecordsUIResource

request_vocabulary_args = request_parser(
    from_conf("request_vocabulary_type_args"), location="view_args"
)


class InvenioVocabulariesUIResource(RecordsUIResource):
    

    
    def create_url_rules(self):
        """Create the URL rules for the record resource."""
        route_config = self.config.routes
        search_route = route_config["search"]
        if not search_route.endswith("/"):
            search_route += "/"
        search_route_without_slash = search_route[:-1]
        routes = [
            route("GET", route_config["export"], self.export),
            route("GET", route_config["detail"], self.detail),
            route("GET", search_route, self.search),
            route("GET", search_route_without_slash, self.search_without_slash),
        ]
        if "create" in route_config:
            routes += [route("GET", route_config["create"], self.create)]
        if "edit" in route_config:
            routes += [route("GET", route_config["edit"], self.edit)]
        if "uploads" in route_config:
            routes += [route("GET", route_config["uploads"], self.uploads)]
        if "communities" in route_config:
            routes += [route("GET", route_config["communities"], self.communities)]
        return routes
    
    def uploads(self):
        search_options = dict(
            api_config=self.api_service.config,
            identity=g.identity,
            overrides={"endpoint": "/api/nr-documents"},
        )
        search_config = partial(self.config.search_app_config, **search_options)
        search_app_config = search_config(app_id="UserDashboard.Uploads")

        return render_template(self.config.templates["uploads"]["layout"], 
                               search_app_config=search_app_config)
    
    def communities(self):
        search_options = dict(
            api_config=self.api_service.config,
            identity=g.identity,
            overrides={"endpoint": "/api/user/communities"},
        )
        
        search_config = partial(self.config.search_app_config, **search_options)
        search_app_config = search_config(app_id="UserDashboard.Communities", endpoint= "/api/user/communities")
        return render_template(self.config.templates["communities"]["layout"], search_app_config=search_app_config)
    
    # @request_read_args
    # @request_view_args
    # @request_vocabulary_args
    # def detail(self):
    #     return super().detail()

    # @request_read_args
    # @request_view_args
    # @request_vocabulary_args
    # def export(self):
    #     return super().export()

    # @request_read_args
    # @request_view_args
    # @request_vocabulary_args
    # def search(self):
    #     return super().search()

    # @login_required
    # @request_read_args
    # @request_view_args
    # @request_vocabulary_args
    # def create(self):
    #     return super().create()

    # @login_required
    # @request_read_args
    # @request_view_args
    # @request_vocabulary_args
    # def edit(self):
    #     return super().edit()

    # def _get_record(self, resource_requestctx, allow_draft=False):
    #     return self.api_service.read(
    #         g.identity,
    #         (
    #             resource_requestctx.view_args["vocabulary_type"],
    #             resource_requestctx.view_args["pid_value"],
    #         ),
    #     )

    # def empty_record(self, resource_requestctx, **kwargs):
    #     record = super().empty_record(resource_requestctx=resource_requestctx)
    #     if 'metadata' in record:
    #         del record['metadata']
    #     record["type"] = resource_requestctx.view_args["vocabulary_type"]
    #     record["tags"] = []
    #     return record

    # def expand_detail_links(self, identity, record):
    #     """Get links for this result item."""
    #     tpl = LinksTemplate(
    #         self.config.ui_links_item,
    #         {
    #             "url_prefix": self.config.url_prefix,
    #             "vocabulary_type": resource_requestctx.view_args["vocabulary_type"],
    #         },
    #     )
    #     return tpl.expand(identity, record)

    # def expand_search_links(self, identity, pagination, args):
    #     """Get links for this result item."""
    #     tpl = LinksTemplate(
    #         self.config.ui_links_search,
    #         {
    #             "config": self.config,
    #             "url_prefix": self.config.url_prefix,
    #             "vocabulary_type": resource_requestctx.view_args["vocabulary_type"],
    #             "args": args,
    #         },
    #     )
    #     return tpl.expand(identity, pagination)
