import React, { Suspense } from "react";
import DashboardOverview from "../_components/Dashboard-overview";
import {
  getAiSettings,
  getAllJobs,
  getAppliedJobs,
  getFooterDetails,
  getMessages,
  getPartnerBenefits,
  getAllServices,
  getSettingDetails,
  getUserDetails,
  getAllDashobardJobs,
} from "@/app/lib/data";
import Loader from "../_components/Loader";

const page = async () => {
  const [
    users,
    services,
    jobs,
    appliedJobs,
    benefits,
    messages,
    settings,
    aiSettings,
    footer,
  ] = await Promise.all([
    getUserDetails(),
    getAllServices(),
    getAllDashobardJobs(),
    getAppliedJobs(),
    getPartnerBenefits(),
    getMessages(),
    getSettingDetails(),
    getAiSettings(),
    getFooterDetails(),
  ]);

  // -------------------------------------------------
  // JOB STATS CALCULATION
  // -------------------------------------------------

  const now = new Date();

  const liveJobs =
    jobs?.filter((job) => {
      const expires = job.expiresAt ? new Date(job.expiresAt) : null;

      return (
        job.jobStatus === "published" && (expires === null || expires >= now)
      );
    }) ?? [];

  const inactiveJobs =
    jobs?.filter((job) => {
      const expires = job.expiresAt ? new Date(job.expiresAt) : null;

      return job.jobStatus === "draft" || (expires !== null && expires < now);
    }) ?? [];

  // -------------------------------------------------
  // SUMMARY OBJECT
  // -------------------------------------------------

  const summary = {
    usersCount: users?.length ?? 0,
    servicesCount: services?.length ?? 0,
    allJobsCount: jobs?.length ?? 0,
    jobsCount: jobs?.length ?? 0,
    liveJobsCount: liveJobs.length,
    inActiveJobsCount: inactiveJobs.length,
    appliedJobsCount: appliedJobs?.length ?? 0,
    benefitsCount: benefits?.length ?? 0,
    messagesCount: messages?.length ?? 0,
    settingsCount: settings ? 1 : 0,
    aiQuestionsCount: aiSettings?.questions?.length ?? 0,
    footer: users?.length ?? 0,
  };

  const selected = {
    address: {
      email: footer?.email ?? "",
      address: footer?.address ?? "",
      linkedIn: footer?.linkedIn ?? "",
      facebook: footer?.facebook ?? "",
    },
    ai: {
      questions: aiSettings?.questions?.map((q) => q) ?? [],
    },
    pin: settings?.REGISTER_PIN,
  };

  return (
    <div>
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <DashboardOverview summary={summary} selected={selected} />
      </Suspense>
    </div>
  );
};

export default page;
