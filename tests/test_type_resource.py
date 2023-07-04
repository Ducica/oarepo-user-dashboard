def test_resource_get(
    app,
    app_config,
    client,
    db,
    identity,
    vocab_cf,
    lang_data_many,
    empty_licences,
    search_clear,
):
    resp = client.get("/api/vocabularies/").json

    results = resp
    assert results["hits"]["total"] == 2
    hits = results["hits"]["hits"]

    hits_languages = [hit for hit in hits if hit["id"] == "languages"][0]
    assert hits_languages["count"] == 5

    hits_licences = [hit for hit in hits if hit["id"] == "licences"][0]
    assert hits_licences["count"] == 0


def test_accept_header(
    app,
    app_config,
    client,
    db,
    identity,
    vocab_cf,
    lang_data_many,
    empty_licences,
    search_clear,
):
    invenio_json_header = "application/vnd.inveniordm.v1+json"
    resp = client.get(
        "/api/vocabularies/", headers={"accept": invenio_json_header}
    ).json

    # TODO.
    print(resp)
