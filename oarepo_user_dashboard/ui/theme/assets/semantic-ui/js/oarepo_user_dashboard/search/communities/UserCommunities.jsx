import React from "react";
import { Button } from "semantic-ui-react";
import { parametrize, overrideStore } from "react-overridable";
import { createSearchAppInit } from "@js/invenio_search_ui";
import {
  ActiveFiltersElement,
  BucketAggregationElement,
  BucketAggregationValuesElement,
  SearchAppResults,
  SearchAppResultOptions,
  SearchAppSort,
} from "@js/oarepo_ui/search";
import {
  DashboardResultView,
  DashboardSearchLayoutHOC,
} from "../components/base";
import { i18next } from "@translations/oarepo_user_dashboard_ui/i18next";
import { RDMRecordSearchBarElement } from "../components/SearchBar";

import { CommunityItem } from "../components/resultitems/communities/CommunitiesResultItem";
const appName = "UserDashboard.Communities";

const DashboardResultViewWAppName = parametrize(DashboardResultView, {
  appName: appName,
});

export const DashboardUploadsSearchLayout = DashboardSearchLayoutHOC({
  searchBarPlaceholder: i18next.t("Search in my uploads..."),
  newBtn: (
    <Button
      positive
      icon="upload"
      href="/uploads/new"
      content={i18next.t("New upload")}
      floated="right"
    />
  ),
  appName: appName,
});
export const defaultComponents = {
  [`${appName}.ActiveFilters.element`]: ActiveFiltersElement,

  [`${appName}.BucketAggregation.element`]: BucketAggregationElement,
  [`${appName}.BucketAggregationValues.element`]:
    BucketAggregationValuesElement,
  [`${appName}.SearchApp.resultOptions`]: SearchAppResultOptions,
  [`${appName}.SearchApp.results`]: SearchAppResults,
  // [`${appName}.EmptyResults.element`]: RDMEmptyResults,
  [`${appName}.ResultsList.item`]: CommunityItem,
  // [`${appName}.SearchApp.facets`]: ContribSearchAppFacetsWithConfig,
  [`${appName}.SearchApp.results`]: DashboardResultViewWAppName,
  [`${appName}.SearchBar.element`]: RDMRecordSearchBarElement,
  // [`${appName}.SearchApp.facets`]: SearchAppFacets,
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
