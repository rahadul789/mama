import { LucidePanelBottom } from "lucide-react";
import { Suspense } from "react";
import { getFooterDetails } from "@/app/lib/data";
import FooterSectionForm from "../../_components/footer-section-form";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Footer",
};

export default async function page() {
  const data = getFooterDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <LucidePanelBottom className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">Footer Section</h1>
      </div>

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <FooterSectionForm item={data} />
      </Suspense>
    </div>
  );
}
