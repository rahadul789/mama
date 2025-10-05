import React from "react";
import {
  getFooterDetails,
  getHomeDetails,
  getServiccesDetails,
  getVisionDetails,
} from "../lib/data";

const page = async () => {
  const home = getHomeDetails();
  const vision = getVisionDetails();
  const service = getServiccesDetails();
  const footer = getFooterDetails();

  return <div>f</div>;
};

export default page;
