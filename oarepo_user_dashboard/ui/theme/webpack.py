from invenio_assets.webpack import WebpackThemeBundle

theme = WebpackThemeBundle(
    __name__,
    "assets",
    default="semantic-ui",
    themes={
        "semantic-ui": dict(
            entry={
                "oarepo_user_dashboard_uploads": "./js/oarepo_user_dashboard/search/uploads/UserUploads.jsx",

            },
            dependencies={
                "styled-components": "^6",
            },
            devDependencies={},
            aliases={
                "@translations/oarepo_user_dashboard_ui": "./translations/oarepo_user_dashboard_ui",

            },
        )
    },
)
