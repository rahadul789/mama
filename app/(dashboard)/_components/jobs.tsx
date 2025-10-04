"use client";

import {
  updateJobType,
  updatePosition,
  updateSalary,
  updateSummary,
  updateLocation,
  updateKeyResponsibilities,
  updateQualifications,
  updateBenefits,
  deleteJob,
} from "@/app/lib/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { EditableTextField } from "./editable-text-field";
import EditableListField from "./EditableListField";
import { useActionState } from "react";

interface JobProps {
  job: {
    id: number;
    position: string;
    type: string;
    salaryRange: string;
    location: string;
    summary: string;
    keyResponsibilities: string[];
    qualifications: string[];
    benefits: string[];
  };
}

export function Job({ job }: JobProps) {
  const [state, action, pending] = useActionState(deleteJob, undefined);

  return (
    <>
      <div className=" flex items-center gap-2">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-0">
            <AccordionTrigger className="flex justify-between items-center cursor-pointer  ">
              <div className=" flex justify-between items-center w-full">
                <div>
                  <h1 className=" text-2xl  font-sans font-semibold">
                    {job.position}
                  </h1>
                  <div className="flex text-xs text-gray-400 gap-1 font-sans space-x-1.5">
                    <span>{job.type}</span>
                    <span> • </span>
                    <span>{job.salaryRange}</span>
                    <span> • </span>
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance px-4 mt-3">
              <EditableTextField
                id={job.id}
                label="Position"
                name="position"
                placeholder="Senior DevOps Developer"
                initialValue={job.position}
                action={updatePosition}
              />

              <EditableTextField
                id={job.id}
                label="Job Type"
                name="jobType"
                placeholder="Full-time, Part-time, Contract"
                initialValue={job.type}
                action={updateJobType}
              />

              <EditableTextField
                id={job.id}
                label="Salary"
                name="salaryRange"
                placeholder="৳80,000 – ৳120,000"
                initialValue={job.salaryRange}
                action={updateSalary}
              />

              <EditableTextField
                id={job.id}
                label="Location"
                name="location"
                placeholder="Dhaka, Bangladesh"
                initialValue={job.location}
                action={updateLocation}
              />
              <EditableTextField
                id={job.id}
                label="Summary"
                name="summary"
                placeholder="Write summary here..."
                initialValue={job.summary}
                action={updateSummary}
              />

              <div className=" space-y-4">
                <EditableListField
                  id={job.id}
                  label="Key Responsibilities"
                  name="keyResponsibilities"
                  initialValues={job.keyResponsibilities}
                  action={updateKeyResponsibilities}
                />
                <EditableListField
                  id={job.id}
                  label="Qualifications"
                  name="qualifications"
                  initialValues={job.qualifications}
                  action={updateQualifications}
                />
                <EditableListField
                  id={job.id}
                  label="Benefits"
                  name="benefits"
                  initialValues={job.benefits}
                  action={updateBenefits}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div>
          <form action={action}>
            <input type="hidden" name="id" value={job.id} />

            <Button
              variant="ghost"
              size="icon"
              type="submit"
              className=" rounded-full text-xs p-[10px]"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <Trash2 className=" text-red-600 hover:text-red-800 transition cursor-pointer" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
