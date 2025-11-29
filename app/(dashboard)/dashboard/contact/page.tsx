import { ReceiptText } from "lucide-react";
import HomeSectionForm from "../../_components/home-section-form";
import { Suspense } from "react";
import { getContactDetails } from "@/app/lib/data";
import ContactSectionForm from "../../_components/contact-section-form";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Contact",
};

export default async function page() {
  const data = getContactDetails();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <ReceiptText className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Contact Section
        </h1>
      </div>

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <ContactSectionForm item={data} />
      </Suspense>
    </div>
  );
}
