// // This file is part of InvenioRDM
// // Copyright (C) 2020-2023 CERN.
// // Copyright (C) 2020-2021 Northwestern University.
// // Copyright (C) 2021 Graz University of Technology.
// // Copyright (C) 2021 New York University.
// //
// // Invenio App RDM is free software; you can redistribute it and/or modify it
// // under the terms of the MIT License; see LICENSE file for more details.

// import { createSearchAppInit } from "@js/invenio_search_ui";
// import {
//   ContribBucketAggregationElement,
//   ContribBucketAggregationValuesElement,
//   ContribSearchAppFacets,
// } from "@js/invenio_search_ui/components";
// import PropTypes from "prop-types";
// import React from "react";
// import { overrideStore, parametrize } from "react-overridable";
// import { withState } from "react-searchkit";
// import { defaultContribComponents } from "@js/invenio_requests/contrib";
// import { RDMRecordSearchBarElement } from "../components/SearchBar";

// import {
//   RequestsSearchLayout,
//   RequestsEmptyResultsWithState,
//   RequestsResults,
// } from "@js/invenio_requests/search";
// import { RequestsResultItem } from "../components/resultitems/requests/RequestsResultItem";
// import { SearchAppFacets } from "@js/oarepo_ui";

// const appName = "UserDashboard.Requests";

// export function RequestsResultsItemTemplateDashboard({ result }) {
//   const ComputerTabletRequestsItemWithState = withState(
//     ComputerTabletRequestItem
//   );
//   const MobileRequestsItemWithState = withState(MobileRequestItem);
//   const detailsURL = `/me/requests/${result.id}`;
//   return (
//     <>
//       <ComputerTabletRequestsItemWithState
//         result={result}
//         detailsURL={detailsURL}
//       />
//       <MobileRequestsItemWithState result={result} detailsURL={detailsURL} />
//     </>
//   );
// }

// RequestsResultsItemTemplateDashboard.propTypes = {
//   result: PropTypes.object.isRequired,
// };

// const RequestsSearchLayoutWithApp = parametrize(RequestsSearchLayout, {
//   appName: appName,
// });

// export const defaultComponents = {
//   [`${appName}.BucketAggregation.element`]: ContribBucketAggregationElement,
//   [`${appName}.BucketAggregationValues.element`]:
//     ContribBucketAggregationValuesElement,
//   [`${appName}.SearchApp.facets`]: SearchAppFacets,
//   [`${appName}.ResultsList.item`]: RequestsResultsItemTemplateDashboard,
//   [`${appName}.ResultsGrid.item`]: () => null,
//   [`${appName}.SearchApp.layout`]: RequestsSearchLayoutWithApp,
//   [`${appName}.SearchApp.results`]: RequestsResults,
//   [`${appName}.SearchBar.element`]: RDMRecordSearchBarElement,
//   [`${appName}.EmptyResults.element`]: RequestsEmptyResultsWithState,
//   ...defaultContribComponents,
// };

// const overriddenComponents = overrideStore.getAll();

// createSearchAppInit(
//   { ...defaultComponents, ...overriddenComponents },
//   true,
//   "invenio-search-config",
//   true
// );
