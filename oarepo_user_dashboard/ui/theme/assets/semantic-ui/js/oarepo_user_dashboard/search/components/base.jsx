// This file is part of InvenioRDM
// Copyright (C) 2020-2022 CERN.
// Copyright (C) 2020-2021 Northwestern University.
// Copyright (C) 2021 Graz University of Technology.
// Copyright (C) 2021 New York University.
//
// Invenio App RDM is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import {
  SearchAppResultsPane,
  InvenioSearchPagination,
} from "@js/invenio_search_ui/components";
import { i18next } from "@translations/oarepo_user_dashboard_ui/i18next";
import React from "react";
import {
  Count,
  ResultsList,
  SearchBar,
  Sort,
  buildUID,
  Pagination,
  ResultsPerPage,
} from "react-searchkit";
import { GridResponsiveSidebarColumn } from "react-invenio-forms";
import { Grid, Segment, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import Overridable from "react-overridable";
import {
  SearchAppFacets,
  ResultCount,
  SearchAppSort,
  ResultsPerPageLabel,
} from "@js/oarepo_ui";

export function DashboardResultView(props) {
  const { sortOptions, paginationOptions, currentResultsState, appName } =
    props;
  console.log(sortOptions);
  const { total } = currentResultsState.data;
  const { resultsPerPage } = paginationOptions;
  return (
    total && (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Grid>
                <Overridable
                  id={buildUID("ResultView.resultHeader", "", appName)}
                  sortOptions={sortOptions}
                  paginationOptions={paginationOptions}
                  currentResultsState={currentResultsState}
                  appName={appName}
                >
                  <Grid.Row
                    verticalAlign="middle"
                    className="small pt-5 pb-5 highlight-background"
                  >
                    <Grid.Column width={4}>
                      <ResultCount currentResultsState={currentResultsState} />
                    </Grid.Column>
                    <Grid.Column
                      width={12}
                      textAlign="right"
                      className="padding-r-5"
                    >
                      {sortOptions.length > 0 && (
                        <SearchAppSort options={sortOptions} />
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Overridable>
                <Overridable
                  id={buildUID("ResultView.resultList", "", appName)}
                  sortOptions={sortOptions}
                  paginationOptions={paginationOptions}
                  currentResultsState={currentResultsState}
                  appName={appName}
                >
                  <Grid.Row>
                    <Grid.Column>
                      <ResultsList />
                    </Grid.Column>
                  </Grid.Row>
                </Overridable>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Overridable
          id={buildUID("ResultView.resultFooter", "", appName)}
          sortOptions={sortOptions}
          paginationOptions={paginationOptions}
          currentResultsState={currentResultsState}
          appName={appName}
        >
          {total > 10 && (
            <Grid.Row verticalAlign="middle" className="rel-mb-2">
              <Grid.Column
                className="computer tablet only"
                width={4}
              ></Grid.Column>
              <Grid.Column
                className="computer tablet only"
                width={8}
                textAlign="center"
              >
                <Pagination
                  options={{
                    size: "mini",
                    showFirst: false,
                    showLast: false,
                  }}
                />
              </Grid.Column>
              <Grid.Column
                className="mobile only"
                width={16}
                textAlign="center"
              >
                <Pagination
                  options={{
                    size: "mini",
                    boundaryRangeCount: 0,
                    showFirst: false,
                    showLast: false,
                  }}
                />
              </Grid.Column>
              <Grid.Column
                className="computer tablet only "
                textAlign="right"
                width={4}
              >
                <ResultsPerPage
                  values={resultsPerPage}
                  label={ResultsPerPageLabel}
                />
              </Grid.Column>
              <Grid.Column
                className="mobile only mt-10"
                textAlign="center"
                width={16}
              >
                <ResultsPerPage
                  values={resultsPerPage}
                  label={ResultsPerPageLabel}
                />
              </Grid.Column>
            </Grid.Row>
          )}
        </Overridable>
      </Grid>
    )
  );
}

DashboardResultView.propTypes = {
  sortOptions: PropTypes.array.isRequired,
  paginationOptions: PropTypes.object.isRequired,
  currentResultsState: PropTypes.object.isRequired,
  appName: PropTypes.string,
};

DashboardResultView.defaultProps = {
  appName: "",
};

export const DashboardSearchLayoutHOC = ({
  searchBarPlaceholder = "",
  newBtn = () => null,
  appName = undefined,
}) => {
  const DashboardUploadsSearchLayout = (props) => {
    const [sidebarVisible, setSidebarVisible] = React.useState(false);
    const { config } = props;

    return (
      <Grid>
        <Grid.Column only="mobile tablet" mobile={2} tablet={1}>
          <Button
            basic
            icon="sliders"
            onClick={() => setSidebarVisible(true)}
            aria-label={i18next.t("Filter results")}
          />
        </Grid.Column>

        <Grid.Column mobile={14} tablet={10} computer={8} floated="right">
          <SearchBar placeholder={searchBarPlaceholder} />
        </Grid.Column>

        <Grid.Column mobile={16} tablet={5} computer={4} align="right">
          {newBtn}
        </Grid.Column>

        <Grid.Row>
          <GridResponsiveSidebarColumn
            width={4}
            open={sidebarVisible}
            onHideClick={() => setSidebarVisible(false)}
          >
            <SearchAppFacets aggs={config.aggs} appName={appName} />
          </GridResponsiveSidebarColumn>
          <Grid.Column mobile={16} tablet={16} computer={12}>
            <SearchAppResultsPane
              layoutOptions={config.layoutOptions}
              appName={appName}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  DashboardUploadsSearchLayout.propTypes = {
    config: PropTypes.object.isRequired,
  };

  return DashboardUploadsSearchLayout;
};
