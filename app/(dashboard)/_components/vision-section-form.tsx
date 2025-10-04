"use client";

import { updateVision } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface VisionSectionFormProps {
  item: Promise<{
    id: number;
    heading: string;
    solutionTitle: string;
    solutionDescription: string;
    visionTitle: string;
    visionDescription: string;
    impactTitle: string;
    impactDescription: string;
  }>;
}

const VisionSectionForm = ({ item: VisionItem }: VisionSectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(VisionItem);

  const [formData, setFormData] = useState({
    heading: item.heading || "",
    solutionTitle: item.solutionTitle || "",
    solutionDescription: item.solutionDescription || "",
    visionTitle: item.visionTitle || "",
    visionDescription: item.visionDescription || "",
    impactTitle: item.impactTitle || "",
    impactDescription: item.impactDescription || "",
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

  const [state, action, pending] = useActionState(updateVision, undefined);

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  return (
    <form action={action}>
      <div className=" my-8 space-y-4 max-w-2xl">
        <div className=" shadow-md p-6  rounded-md border-l-4 border-amber-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Heading</h2>
          {isEdit ? (
            <Input
              name="heading"
              id="heading"
              value={formData.heading}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.heading}</p>
          )}
          {state?.errors?.heading && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.heading}
            </p>
          )}
        </div>
        <p className=" mt-10 font-semibold text-xs">Solutions</p>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-brand-teal border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Title</h2>
          {isEdit ? (
            <Input
              name="solutionTitle"
              id="solutionTitle"
              value={formData.solutionTitle}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.solutionTitle}</p>
          )}
          {state?.errors?.solutionTitle && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.solutionTitle}
            </p>
          )}
        </div>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-violet-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Description</h2>

          {isEdit ? (
            <Textarea
              name="solutionDescription"
              id="solutionDescription"
              value={formData.solutionDescription}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.solutionDescription}</p>
          )}
          {state?.errors?.solutionDescription && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.solutionDescription}
            </p>
          )}
        </div>

        <p className=" mt-10 font-semibold text-xs">Vision</p>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-brand-teal border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Title</h2>
          {isEdit ? (
            <Input
              name="visionTitle"
              id="visionTitle"
              value={formData.visionTitle}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.visionTitle}</p>
          )}
          {state?.errors?.visionTitle && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.visionTitle}
            </p>
          )}
        </div>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-violet-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Description</h2>

          {isEdit ? (
            <Textarea
              name="visionDescription"
              id="visionDescription"
              value={formData.visionDescription}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.visionDescription}</p>
          )}
          {state?.errors?.visionDescription && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.visionDescription}
            </p>
          )}
        </div>

        <p className=" mt-10 font-semibold text-xs">Impact</p>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-brand-teal border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Title</h2>
          {isEdit ? (
            <Input
              name="impactTitle"
              id="impactTitle"
              value={formData.impactTitle}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.impactTitle}</p>
          )}
          {state?.errors?.impactTitle && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.impactTitle}
            </p>
          )}
        </div>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-violet-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Description</h2>

          {isEdit ? (
            <Textarea
              name="impactDescription"
              id="impactDescription"
              value={formData.impactDescription}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.impactDescription}</p>
          )}
          {state?.errors?.impactDescription && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.impactDescription}
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
  );
};

export default VisionSectionForm;
