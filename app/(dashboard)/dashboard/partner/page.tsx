import { Handshake } from "lucide-react";
import { Suspense } from "react";
import { getPartnerBenefits, getPartnerDetails } from "@/app/lib/data";
import AddBenefitModal from "../../_components/add-benefit-modal";
import ParterSection from "../../_components/partner-sction";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Partner",
};

export default async function page() {
  const data = getPartnerDetails();
  const benefits = getPartnerBenefits();

  return (
    <div className=" my-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <Handshake className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Partner Section
        </h1>
      </div>

      <AddBenefitModal />

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <ParterSection item={data} benefits={benefits} />
      </Suspense>
    </div>
  );
}
