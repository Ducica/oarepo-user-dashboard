import _get from "lodash/get";
import React from "react";
import { Button } from "semantic-ui-react";
import { parametrize, overrideStore } from "react-overridable";
import { http } from "react-invenio-forms";
import { createSearchAppInit } from "@js/invenio_search_ui";
import PropTypes from "prop-types";
import {
  ActiveFiltersElement,
  BucketAggregationElement,
  BucketAggregationValuesElement,
  ErrorElement,
  SearchAppFacets,
  SearchAppLayout,
  SearchAppResults,
  SearchAppResultOptions,
  SearchAppSearchbarContainer,
  SearchFiltersToggleElement,
  SearchAppSort,
} from "@js/oarepo_ui/search";
import {
  DashboardResultView,
  DashboardSearchLayoutHOC,
} from "../components/base";
import { i18next } from "@translations/oarepo_user_dashboard_ui/i18next";
import { ComputerTabletUploadsItem } from "../components/resultitems/uploads/ComputerTabletUploadsItem";
import { MobileUploadsItem } from "../components/resultitems/uploads/MobileUploadsItem";

const appName = "UserDashboard.Uploads";

export const UserDashboardResultListItem = ({ result }) => {
  const uiMetadata = {
    title: _get(result, "metadata.title", i18next.t("No title")),
    // abstract: _get(result, "metadata.abstract", i18next.t("No abstract")),
    resourceType: _get(
      result,
      "metadata.resourceType",
      i18next.t("No resource type")
    ),
    createdDate: _get(result, "created"),
    viewLink: _get(result, "links.self_html"),
  };

  return (
    <React.Fragment>
      <MobileUploadsItem result={result} uiMetadata={uiMetadata} />
      <ComputerTabletUploadsItem result={result} uiMetadata={uiMetadata} />
    </React.Fragment>
  );
};

UserDashboardResultListItem.propTypes = {
  result: PropTypes.object.isRequired,
};
const CountElement = ({ total }) => <div>Count element</div>;
const BucketElement = ({ bucket }) => <div>Bucket element</div>;

const DashboardResultViewWAppName = parametrize(DashboardResultView, {
  appName: appName,
});

export const DashboardUploadsSearchLayout = DashboardSearchLayoutHOC({
  searchBarPlaceholder: i18next.t("Search in my uploads..."),
  newBtn: (
    <Button
      positive
      icon="upload"
      href="/docs/_new"
      content={i18next.t("New upload")}
      floated="right"
    />
  ),
  appName: appName,
});
export const defaultComponents = {
  [`${appName}.ActiveFilters.element`]: ActiveFiltersElement,

  [`${appName}.BucketAggregation.element`]: BucketElement,
  [`${appName}.BucketAggregationValues.element`]:
    BucketAggregationValuesElement,
  [`${appName}.BucketAggregationValues.element`]: BucketAggregationElement,
  [`${appName}.SearchApp.resultOptions`]: SearchAppResultOptions,
  // [`${appName}.EmptyResults.element`]: RDMEmptyResults,
  [`${appName}.ResultsList.item`]: UserDashboardResultListItem,
  // [`${appName}.SearchApp.facets`]: ContribSearchAppFacetsWithConfig,
  [`${appName}.SearchApp.results`]: DashboardResultViewWAppName,
  // [`${appName}.SearchBar.element`]: RDMRecordSearchBarElement,
  [`${appName}.SearchApp.layout`]: DashboardUploadsSearchLayout,
  [`${appName}.SearchApp.sort`]: SearchAppSort,
};

// TODO: can provide overrides here before calling createSearchAppInit
const overriddenComponents = overrideStore.getAll();

// TODO: search app has inbuilt mechanism to look for overrides in @templates simikar
// to how it looks for custom fields im templates/custom_fields
createSearchAppInit(
  { ...defaultComponents, ...overriddenComponents },
  true,
  "invenio-search-config",
  true
);
