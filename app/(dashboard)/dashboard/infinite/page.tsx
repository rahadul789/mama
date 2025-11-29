import { Infinity } from "lucide-react";
import { Suspense } from "react";
import { getInfiniteDetails } from "@/app/lib/data";
import AddInfiniteModal from "../../_components/add-infinite-modal";
import InfiniteSection from "../../_components/infinite-section";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Infinite",
};

export default async function page() {
  const data = getInfiniteDetails();
  const info = await getInfiniteDetails();
  const heading = info[0]?.heading || "Powering modern banking";
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <Infinity className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Infinite Section
        </h1>
      </div>

      <AddInfiniteModal heading={heading} />

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <InfiniteSection items={data} />
      </Suspense>
    </div>
  );
}
