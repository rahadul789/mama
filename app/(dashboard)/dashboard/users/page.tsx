import { Users } from "lucide-react";
import { Suspense } from "react";
import { getFeatureDetails, getUserDetails } from "@/app/lib/data";
import VisionSectionForm from "../../_components/vision-section-form";
import Loader from "../../_components/Loader";
import UserSections from "../../_components/users-section";

export const metadata = {
  title: "Dashboard | Users",
};

export default async function page() {
  const users = await getUserDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <Users className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">Users Section</h1>
      </div>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <UserSections users={users} currentUserId={users[0]?.id ?? 0} />
      </Suspense>
    </div>
  );
}
