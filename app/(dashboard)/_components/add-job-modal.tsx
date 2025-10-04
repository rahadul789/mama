"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrayField } from "./array-field";
import { addJob } from "@/app/lib/actions";
import { toast } from "sonner";

const initialBenefits = [
  "Be part of a dynamic and innovative team that values collaboration and professional growth.",
  "Competitive salary and benefits package.",
  "Opportunities for continuous learning and career advancement.",
];

export default function AddJobModal() {
  const [open, setOpen] = useState(false);

  // Local state for repeatable array fields
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [qualifications, setQualifications] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>(initialBenefits);
  const [state, action, pending] = useActionState(addJob, undefined);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
      toast.success("Job added successfully.");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          <span className="ml-1">Add Job</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl ">
        <DialogHeader>
          <DialogTitle>Add Job</DialogTitle>
          <DialogDescription>
            Fill out the details for a new job posting.
          </DialogDescription>
        </DialogHeader>

        <div className="sm:max-w-2xl h-[500px]  overflow-y-auto">
          <form className="space-y-4" action={action}>
            {/* Position */}
            <div className="shadow-md p-6 rounded-md border-l-4 border-brand-teal space-y-2">
              <Label htmlFor="position" className="text-sm font-semibold">
                Position
              </Label>
              <Input
                id="position"
                name="position"
                placeholder="e.g. Senior Frontend Engineer"
              />
              {state?.errors?.position && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.position}
                </p>
              )}
            </div>

            {/* Type */}
            <div className="shadow-md p-6 rounded-md border-l-4 border-violet-400 space-y-2">
              <Label htmlFor="type" className="text-sm font-semibold">
                Type
              </Label>
              <Input
                id="type"
                name="type"
                placeholder="e.g. Full-time / Contract / Internship"
              />
              {state?.errors?.type && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.type}
                </p>
              )}
            </div>

            {/* Salary Range */}
            <div className="shadow-md p-6 rounded-md border-l-4 border-sky-400 space-y-2">
              <Label htmlFor="salaryRange" className="text-sm font-semibold">
                Salary Range
              </Label>
              <Input
                id="salaryRange"
                name="salaryRange"
                placeholder="e.g. $80k–$110k / month BDT 150k–200k"
              />
              {state?.errors?.salaryRange && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.salaryRange}
                </p>
              )}
            </div>

            {/* Location */}
            <div className="shadow-md p-6 rounded-md border-l-4 border-emerald-400 space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. Dhaka, BD (Hybrid)"
              />
              {state?.errors?.location && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.location}
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="shadow-md p-6 rounded-md border-l-4 border-orange-400 space-y-2">
              <Label htmlFor="summary" className="text-sm font-semibold">
                Summary
              </Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="One-paragraph overview of the role"
                rows={4}
              />
              {state?.errors?.summary && (
                <p className=" text-red-700 text-xs font-semibold">
                  {state.errors.summary}
                </p>
              )}
            </div>

            {/* Key Responsibilities (varchar[]) */}
            <ArrayField
              label="Key Responsibilities"
              description="Add each responsibility as its own line."
              fieldName="keyResponsibilities"
              values={responsibilities}
              setValues={setResponsibilities}
            />

            {/* Qualifications (varchar[]) */}
            <ArrayField
              label="Qualifications"
              description="Add each requirement as its own line."
              fieldName="qualifications"
              values={qualifications}
              setValues={setQualifications}
            />

            {/* Benefits (varchar[]) */}
            <ArrayField
              label="Benefits"
              description="Add each benefit as its own line."
              fieldName="benefits"
              values={benefits}
              setValues={setBenefits}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className=" animate-spin" />
                    <span>Adding</span>
                  </>
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
