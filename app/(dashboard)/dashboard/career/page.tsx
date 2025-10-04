import { IdCardLanyard } from "lucide-react";
import { Suspense } from "react";
import { getAllJobs, getCareerDetails } from "@/app/lib/data";
import AddJobModal from "../../_components/add-job-modal";
import CareerSection from "../../_components/career-section";

export default async function page() {
  const data = getCareerDetails();
  const jobs = getAllJobs();

  return (
    <div className=" my-8 ">
      <div className="flex items-center gap-1 mb-2  text-sm">
        <IdCardLanyard className="w-4 h-4 font-bold " />
        <span className="font-bold ">Career Section</span>
      </div>
      <AddJobModal />

      <Suspense fallback={<div>Loading...</div>}>
        <CareerSection item={data} allJobs={jobs} />
      </Suspense>
    </div>
  );
}
