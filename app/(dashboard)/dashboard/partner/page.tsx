import { Handshake } from "lucide-react";
import { Suspense } from "react";
import { getPartnerBenefits, getPartnerDetails } from "@/app/lib/data";
import AddBenefitModal from "../../_components/add-benefit-modal";
import ParterSection from "../../_components/partner-sction";

export default async function page() {
  const data = getPartnerDetails();
  const benefits = getPartnerBenefits();

  return (
    <div className=" my-8 ">
      <div className="flex items-center gap-1 mb-2  text-sm">
        <Handshake className="w-4 h-4 font-bold " />
        <span className="font-bold ">Partner Section</span>
      </div>
      <AddBenefitModal />

      <Suspense fallback={<div>Loading...</div>}>
        <ParterSection item={data} benefits={benefits} />
      </Suspense>
    </div>
  );
}
