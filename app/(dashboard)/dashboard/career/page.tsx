import { IdCardLanyard } from "lucide-react";
import { Suspense } from "react";
import {
  getAllDashobardJobs,
  getAppliedJobs,
  getCareerDetails,
} from "@/app/lib/data";
import AddJobModal from "../../_components/add-job-modal";
import CareerSection from "../../_components/career-section";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Career",
};

export default async function page() {
  const data = getCareerDetails();
  const jobs = getAllDashobardJobs();
  const appliedJobs = getAppliedJobs();

  return (
    <div className=" my-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <IdCardLanyard className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">Career Section</h1>
      </div>

      <AddJobModal />

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <CareerSection item={data} allJobs={jobs} appliedJobs={appliedJobs} />
      </Suspense>
    </div>
  );
}
