// This file is part of InvenioRDM
// Copyright (C) 2022 CERN.
//
// Invenio App RDM is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { i18next } from "@translations/oarepo_user_dashboard_ui/i18next";
import React from "react";
import PropTypes from "prop-types";
import _truncate from "lodash/truncate";
import _get from "lodash/get";
import { Button, Icon, Item, Label } from "semantic-ui-react";

export const ComputerTabletUploadsItem = ({ result, uiMetadata }) => {
  const { abstract, title, resourceType, createdDate, viewLink } = uiMetadata;

  return (
    <Item
      key={result.id}
      className="deposits-list-item computer tablet only flex"
    >
      <Item.Content>
        <Item.Extra className="labels-actions">
          <Label size="tiny" className="neutral">
            {resourceType.title}
          </Label>
          <Button
            compact
            size="small"
            floated="right"
            onClick={() => (window.location.href = viewLink + "/edit")}
            labelPosition="left"
            icon="edit"
            content={i18next.t("Edit")}
          />
        </Item.Extra>
        <Item.Header as="h2">
          <a href={viewLink} className="truncate-lines-2">
            {title}
          </a>
        </Item.Header>
        <Item.Meta>
          <div className="creatibutors"></div>
        </Item.Meta>
        {/* <Item.Description>{abstract}</Item.Description> */}
        <Item.Extra>
          <div className="flex justify-space-between align-items-end">
            <small>
              {createdDate ? (
                <>
                  {i18next.t("Uploaded on {{uploadDate}}", {
                    uploadDate: createdDate,
                  })}
                </>
              ) : (
                i18next.t("No creation date found.")
              )}
            </small>
            <small></small>
          </div>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

ComputerTabletUploadsItem.propTypes = {
  result: PropTypes.object.isRequired,
  uiMetadata: PropTypes.object.isRequired,
};
