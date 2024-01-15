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
import { Dropdown, Icon, Item, Label } from "semantic-ui-react";

export const MobileUploadsItem = ({
  result,
  editRecord,
  statuses,
  access,
  uiMetadata,
}) => {
  const { abstract, title, resourceType, createdDate, viewLink } = uiMetadata;

  return (
    <Item key={result.id} className="deposits-list-item mobile only flex">
      <Item.Content className="centered">
        <Item.Extra className="labels-actions">
          <Label size="tiny" className="neutral">
            {resourceType.title}
          </Label>
        </Item.Extra>
        <Item.Header as="h2">
          <a href={viewLink} className="truncate-lines-2">
            {title}
          </a>
        </Item.Header>
        <Item.Description>{abstract}</Item.Description>
        <Item.Extra>
          <Item.Extra>
            <div>
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
            </div>
          </Item.Extra>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

MobileUploadsItem.propTypes = {
  result: PropTypes.object.isRequired,
  editRecord: PropTypes.func.isRequired,
  statuses: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired,
  uiMetadata: PropTypes.object.isRequired,
};
