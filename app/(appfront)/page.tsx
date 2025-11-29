import React from "react";
import {
  getFooterDetails,
  getHomeDetails,
  getServiccesDetails,
  getFeatureDetails,
  getAllServices,
  getTestimonyDetails,
  getInfiniteDetails,
  getContactDetails,
} from "../lib/data";
import Home from "./_components/home";
import Services from "./_components/services";
import Features from "./_components/features";
import ContentSection from "./_components/content";
import ServicesStrip from "./_components/services-strip";
import CallToAction from "./_components/cta";

const page = async () => {
  const home = await getHomeDetails();
  const features = await getFeatureDetails();
  const services = await getServiccesDetails();
  const serviceList = await getAllServices();
  const testimony = await getTestimonyDetails();
  const InfiniteSlider = await getInfiniteDetails();
  const contact = await getContactDetails();

  return (
    <div>
      <div className=" ">
        <div className="space-y-12 md:space-y-16">
          {/* <Loading /> */}
          <Home data={home} />
          <Features data={features} />
        </div>
        <div className=""></div>
        <div className="" id="services">
          <Services data={services} services={serviceList} />
        </div>
        <div className="">
          <ContentSection data={testimony} />
        </div>
        <div className=" max-w-6xl mx-auto">
          <ServicesStrip data={InfiniteSlider} />
        </div>
        <div className="">
          <CallToAction data={contact} />
        </div>
      </div>
    </div>
  );
};

export default page;
