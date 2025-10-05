import { LucidePanelBottom } from "lucide-react";
import { Suspense } from "react";
import { getFooterDetails } from "@/app/lib/data";
import FooterSectionForm from "../../_components/footer-section-form";

export default async function page() {
  const data = getFooterDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 mb-2  text-sm">
        <LucidePanelBottom className="w-4 h-4 font-bold " />
        <span className="font-bold ">Footer Section</span>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <FooterSectionForm item={data} />
      </Suspense>
    </div>
  );
}
