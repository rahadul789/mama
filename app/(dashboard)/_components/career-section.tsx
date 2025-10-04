"use client";

import { updateCareer } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Job } from "./jobs";

interface jobSectionProps {
  item: Promise<{
    id: number;
    heroTitle: string;
    title: string;
    subTitle: string;
    email: string;
  }>;
  allJobs: Promise<
    {
      id: number;
      position: string;
      type: string;
      salaryRange: string;
      location: string;
      summary: string;
      keyResponsibilities: string[];
      qualifications: string[];
      benefits: string[];
    }[]
  >;
}

const CareerSection = ({ item: VisionItem, allJobs }: jobSectionProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(VisionItem);
  const jobs = use(allJobs);

  const [formData, setFormData] = useState({
    heroTitle: item.heroTitle || "",
    title: item.title || "",
    subTitle: item.subTitle || "",
    email: item.email || "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [state, action, pending] = useActionState(updateCareer, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  return (
    <>
      <form action={action}>
        <div className=" my-8 space-y-4 max-w-2xl">
          <div className=" shadow-md p-6  rounded-md border-l-4 border-brand-teal border-t-1 space-y-2">
            <h2 className=" text-sm font-semibold">Hero Title</h2>
            {isEdit ? (
              <>
                <Input
                  name="heroTitle"
                  id="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleOnChange}
                />
                <div className=" flex items-center justify-end">
                  ...{" "}
                  <p className=" text-xs text-brand-red font-semibold">
                    1<span className=" text-brand-teal">Technologies</span>
                  </p>
                </div>
              </>
            ) : (
              <p className=" text-muted-foreground">{item.heroTitle}</p>
            )}
            {state?.errors?.heroTitle && (
              <p className=" text-red-700 text-xs font-semibold">
                {state.errors.heroTitle}
              </p>
            )}
          </div>
          <div className=" shadow-md p-6  rounded-md border-l-4 border-violet-400 border-t-1 space-y-2">
            <h2 className=" text-sm font-semibold">Title</h2>

            {isEdit ? (
              <Input
                name="title"
                id="title"
                value={formData.title}
                onChange={handleOnChange}
              />
            ) : (
              <p className=" text-muted-foreground">{item.title}</p>
            )}
            {state?.errors?.title && (
              <p className=" text-red-700 text-xs font-semibold">
                {state.errors.title}
              </p>
            )}
          </div>
          <div className=" shadow-md p-6  rounded-md border-l-4 border-amber-400 border-t-1 space-y-2">
            <h2 className=" text-sm font-semibold">Sub Title</h2>

            {isEdit ? (
              <Input
                name="subTitle"
                id="subTitle"
                value={formData.subTitle}
                onChange={handleOnChange}
              />
            ) : (
              <p className=" text-muted-foreground">{item.subTitle}</p>
            )}
            {state?.errors?.subTitle && (
              <p className=" text-red-700 text-xs font-semibold">
                {state.errors.subTitle}
              </p>
            )}
          </div>
          <div className=" shadow-md p-6  rounded-md border-l-4 border-green-400 border-t-1 space-y-2">
            <h2 className=" text-sm font-semibold">Email</h2>

            {isEdit ? (
              <Input
                name="email"
                id="email"
                value={formData.email}
                onChange={handleOnChange}
              />
            ) : (
              <p className=" text-muted-foreground">{item.email}</p>
            )}
            {state?.errors?.email && (
              <p className=" text-red-700 text-xs font-semibold">
                {state.errors.email}
              </p>
            )}
          </div>

          {!isEdit && (
            <div className=" flex justify-end">
              <Button onClick={() => setIsEdit((prev) => !prev)}>Edit</Button>
            </div>
          )}
          {isEdit && (
            <div className=" flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsEdit((prev) => !prev)}
              >
                Cancel
              </Button>
              <Button disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className=" animate-spin" />
                    <span>Updating</span>
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          )}
        </div>
      </form>
      <div>
        <p className=" text-xs font-bold">Jobs</p>
        <div className=" my-4 space-y-4 max-w-2xl">
          {jobs.length === 0 && (
            <div className="p-10 text-center text-muted-foreground border rounded-md space-y-3">
              <p className=" ">No jobs found.</p>
              <p className=" text-xs">
                Please click{" "}
                <span className=" font-bold text-muted-foreground">
                  Add Job
                </span>{" "}
                to create new jobs.
              </p>
            </div>
          )}
          {jobs.length > 0 && (
            <p>
              Total jobs: <span className=" font-bold">{jobs.length}</span>
            </p>
          )}
          {jobs.map((job) => (
            <div
              key={job.id}
              className=" shadow-md px-4 py-2  rounded-md border-l-4 border-t-1 border-blue-400  space-y-2   transition-all duration-200  hover:shadow-lg hover:scale-[1.02]"
            >
              <Job job={job} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CareerSection;
