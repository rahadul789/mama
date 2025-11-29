import { UserRoundPen } from "lucide-react";
import { Suspense } from "react";
import { getTestimonyDetails } from "@/app/lib/data";
import TestimonySectionForm from "../../_components/testimony-section-form";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Testimony",
};

export default async function page() {
  const data = getTestimonyDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <UserRoundPen className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Testimony Section
        </h1>
      </div>

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <TestimonySectionForm item={data} />
      </Suspense>
    </div>
  );
}
