import { HomeIcon } from "lucide-react";
import HomeSectionForm from "../../_components/home-section-form";
import { Suspense } from "react";
import { getHomeDetails } from "@/app/lib/data";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Home",
};

export default async function page() {
  const data = getHomeDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <HomeIcon className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">Home Section</h1>
      </div>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <HomeSectionForm item={data} />
      </Suspense>
    </div>
  );
}
