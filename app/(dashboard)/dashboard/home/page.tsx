import { HomeIcon } from "lucide-react";
import HomeSectionForm from "../../_components/home-section-form";
import { Suspense } from "react";
import { getHomeDetails } from "@/app/lib/data";

export default async function page() {
  const data = getHomeDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 mb-2  text-sm">
        <HomeIcon className="w-4 h-4 font-bold " />
        <span className="font-bold ">Home Section</span>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeSectionForm item={data} />
      </Suspense>
    </div>
  );
}
