import { Goal, MessagesSquare } from "lucide-react";
import { Suspense } from "react";
import { getMessages } from "@/app/lib/data";
import MessageList from "../../_components/Message-list";
import Loader from "../../_components/Loader";

export const metadata = {
  title: "Dashboard | Messages",
};

export default async function page() {
  const data = getMessages();
  return (
    <div className=" mt-8 ">
      <div className="flex items-center gap-1 border-b border-dashed mb-10 pb-2">
        <div className="p-[6px] rounded-lg bg-brand-teal/20 text-brand-teal">
          <MessagesSquare className="w-4 h-4" />
        </div>

        <h1 className="text-md font-semibold tracking-tight">
          Messages Section
        </h1>
      </div>

      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <MessageList allMessages={data} />
      </Suspense>
    </div>
  );
}
