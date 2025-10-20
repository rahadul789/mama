import React from "react";
import {
  getFooterDetails,
  getHomeDetails,
  getServiccesDetails,
  getVisionDetails,
} from "../lib/data";
import Home from "./_components/home";
import Services from "./_components/services";
import Features from "./_components/features";
import ContentSection from "./_components/content";
import ServicesStrip from "./_components/services-strip";
import CallToAction from "./_components/cta";

const page = async () => {
  const home = await getHomeDetails();
  const vision = await getVisionDetails();
  const service = await getServiccesDetails();

  return (
    <div>
      <div className=" space-y-12 md:space-y-16">
        <div className="">
          <Home />
        </div>
        <div className="">
          <Features />
        </div>
        <div className="">
          <Services />
        </div>
        <div className="">
          <ContentSection />
        </div>
        <div className=" ">
          <ServicesStrip />
        </div>
        <div className="">
          <CallToAction />
        </div>
      </div>
    </div>
  );
};

export default page;
