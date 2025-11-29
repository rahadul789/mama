import { Settings } from "lucide-react";
import { Suspense } from "react";
import { getAiSettings, getSettingDetails } from "@/app/lib/data";
import Loader from "../../_components/Loader";
import SettingsSection from "../../_components/settings";

export const metadata = {
  title: "Dashboard | Settings",
};

export default async function page() {
  const data = getSettingDetails();
  const aiSettings = getAiSettings();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <Settings className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Settings Section
        </h1>
      </div>

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <SettingsSection settings={data} aiSettings={aiSettings} />
      </Suspense>
    </div>
  );
}
