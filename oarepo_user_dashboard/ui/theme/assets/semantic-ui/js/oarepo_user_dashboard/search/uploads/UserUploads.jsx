import _get from "lodash/get";
import _truncate from "lodash/truncate";
import React from "react";
import { Button, Card, Divider, Header, Segment } from "semantic-ui-react";
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

const ResultsListItem = ({ result, index }) => <div>Result list item</div>;
const CountElement = ({ total }) => <div>Count element</div>;
const BucketElement = ({ bucket }) => <div>Bucket element</div>;
const appName = "UserDashboard.Uploads";
export const defaultComponents = {
  [`${appName}.ActiveFilters.element`]: ActiveFiltersElement,

  [`${appName}.BucketAggregation.element`]: BucketElement,
  //   [`${appName}.BucketAggregationValues.element`]:
  //     BucketAggregationValuesElement,
  // [`${appName}.BucketAggregationValues.element`]: ContribBucketAggregationValuesElement,
  [`${appName}.SearchApp.resultOptions`]: SearchAppResultOptions,
  [`${appName}.SearchApp.results`]: SearchAppResults,
  // [`${appName}.EmptyResults.element`]: RDMEmptyResults,
  [`${appName}.ResultsList.item`]: ResultsListItem,
  // [`${appName}.SearchApp.facets`]: ContribSearchAppFacetsWithConfig,
  // [`${appName}.SearchApp.results`]: DashboardResultViewWAppName,
  // [`${appName}.SearchBar.element`]: RDMRecordSearchBarElement,
  // [`${appName}.SearchApp.facets`]: SearchAppFacets,
  // [`${appName}.SearchApp.layout`]: SearchAppLayout,
  [`${appName}.SearchApp.sort`]: SearchAppSort,
};

// TODO: can provide overrides here before calling createSearchAppInit
const overriddenComponents = overrideStore.getAll();
console.log(Object.entries(defaultComponents));

// TODO: search app has inbuilt mechanism to look for overrides in @templates simikar
// to how it looks for custom fields im templates/custom_fields
createSearchAppInit(
  { ...defaultComponents, ...overriddenComponents },
  true,
  "invenio-search-config",
  true
);
