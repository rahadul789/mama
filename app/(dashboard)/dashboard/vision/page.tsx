import { Goal } from "lucide-react";
import { Suspense } from "react";
import { getVisionDetails } from "@/app/lib/data";
import VisionSectionForm from "../../_components/vision-section-form";

export default async function page() {
  const data = getVisionDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 mb-2  text-sm">
        <Goal className="w-4 h-4 font-bold " />
        <span className="font-bold ">Vision Section</span>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <VisionSectionForm item={data} />
      </Suspense>
    </div>
  );
}
