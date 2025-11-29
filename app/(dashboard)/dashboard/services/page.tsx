import { Dock, Plus } from "lucide-react";
import { Suspense } from "react";
import { getAllServices, getServiccesDetails } from "@/app/lib/data";
import ServiceSection from "../../_components/service-section";
import AddServiceModal from "../../_components/add-service-modal";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Services",
};

export default async function page() {
  const data = getServiccesDetails();
  const allSrvices = getAllServices();

  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <Dock className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Service Section
        </h1>
      </div>

      <AddServiceModal />

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <ServiceSection item={data} allServices={allSrvices} />
      </Suspense>
    </div>
  );
}
