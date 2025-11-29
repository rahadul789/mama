import React from "react";
import ServicesSection from "../_components/services-section.page";
import { getAllServices, getServiccesDetails } from "@/app/lib/data";

export const metadata = {
  title: "1Technologies | Services",
};

const Career = async () => {
  const services = await getServiccesDetails();
  const serviceList = await getAllServices();

  return (
    <div className=" ">
      <ServicesSection data={services} services={serviceList} />
    </div>
  );
};

export default Career;
