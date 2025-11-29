import React from "react";
import PartnerInfo from "../_components/partner-info";
import { Benefits } from "../_components/benefits";
import { getPartnerBenefits, getPartnerDetails } from "@/app/lib/data";

export const metadata = {
  title: "1Technologies | Partner",
};

const page = async () => {
  const partner = await getPartnerDetails();
  const partnerBenefits = await getPartnerBenefits();

  return (
    <div>
      <div className=" max-w-7xl mx-auto px-4 py-2">
        <PartnerInfo partner={partner} partnerBenefits={partnerBenefits} />
        <Benefits partners={partner} partnerBenefits={partnerBenefits} />
      </div>
    </div>
  );
};

export default page;
