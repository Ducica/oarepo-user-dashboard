import React from "react";
import PropTypes from "prop-types";

import { ComputerTabletCommunitiesResultItem } from "./ComputerTabletCommunitiesResultItem";
import { MobileCommunitiesResultItem } from "./MobileCommunitiesResultItem";

export function CommunityItem({ result }) {
  return (
    <>
      <ComputerTabletCommunitiesResultItem result={result} />
      <MobileCommunitiesResultItem result={result} />
    </>
  );
}

CommunityItem.propTypes = {
  result: PropTypes.object.isRequired,
};
