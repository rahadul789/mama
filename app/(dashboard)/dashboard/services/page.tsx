import { Dock, Plus } from "lucide-react";
import { Suspense } from "react";
import { getAllServices, getServiccesDetails } from "@/app/lib/data";
import ServiceSection from "../../_components/service-section";
import AddServiceModal from "../../_components/add-service-modal";

export default async function page() {
  const data = getServiccesDetails();
  const allSrvices = getAllServices();

  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 mb-2  text-sm">
        <Dock className="w-4 h-4 font-bold " />
        <span className="font-bold ">Service Section</span>
      </div>
      <AddServiceModal />

      <Suspense fallback={<div>Loading...</div>}>
        <ServiceSection item={data} allServices={allSrvices} />
      </Suspense>
    </div>
  );
}
