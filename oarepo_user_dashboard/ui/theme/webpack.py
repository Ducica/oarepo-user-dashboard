from invenio_assets.webpack import WebpackThemeBundle

theme = WebpackThemeBundle(
    __name__,
    "assets",
    default="semantic-ui",
    themes={
        "semantic-ui": dict(
            entry={
              
            },
            dependencies={
                "@tanstack/react-query": "^4",
            },
            devDependencies={},
            aliases={
                
            },
        )
    },
)
