import React from "react";
import PropTypes from "prop-types";
import { withState } from "react-searchkit";
import { i18next } from "@translations/oarepo_user_dashboard_ui/i18next";
import { Input } from "semantic-ui-react";

export const RDMRecordSearchBarElement = withState(
  ({
    placeholder: passedPlaceholder,
    queryString,
    onInputChange,
    updateQueryState,
    currentQueryState,
  }) => {
    const placeholder = passedPlaceholder || i18next.t("Search");

    const onSearch = () => {
      updateQueryState({ ...currentQueryState, queryString });
    };

    const onBtnSearchClick = () => {
      onSearch();
    };
    const onKeyPress = (event) => {
      if (event.key === "Enter") {
        onSearch();
      }
    };
    return (
      <Input
        action={{
          icon: "search",
          color: "orange",
          onClick: onBtnSearchClick,
          "aria-label": i18next.t("Search"),
        }}
        fluid
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event, { value }) => {
          onInputChange(value);
        }}
        value={queryString}
        onKeyPress={onKeyPress}
      />
    );
  }
);
