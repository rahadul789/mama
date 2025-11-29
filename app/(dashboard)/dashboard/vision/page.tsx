import { Goal } from "lucide-react";
import { Suspense } from "react";
import { getFeatureDetails } from "@/app/lib/data";
import VisionSectionForm from "../../_components/vision-section-form";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Features",
};

export default async function page() {
  const data = getFeatureDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <Goal className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Features Section
        </h1>
      </div>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <VisionSectionForm item={data} />
      </Suspense>
    </div>
  );
}
