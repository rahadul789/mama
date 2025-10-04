"use client";

import { updateCareer, updatePartner } from "@/app/lib/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import UpdateBenefitModal from "./update-benefit-modal";
import DeleteBenefitModal from "./delete-benefit-modal";

interface partnerSectionProps {
  item: Promise<{
    id: number;
    heroTitle: string;
    heroDescription: string;
    title: string;
  }>;
  benefits: Promise<
    {
      id: number;
      title: string;
      description: string;
    }[]
  >;
}

const ParterSection = ({ item: data, benefits }: partnerSectionProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(data);
  const allBenefits = use(benefits);

  const [formData, setFormData] = useState({
    heroTitle: item.heroTitle || "",
    heroDescription: item.heroDescription || "",
    title: item.title || "",
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

  const [state, action, pending] = useActionState(updatePartner, undefined);

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
                name="heroDescription"
                id="heroDescription"
                value={formData.heroDescription}
                onChange={handleOnChange}
              />
            ) : (
              <p className=" text-muted-foreground">{item.heroDescription}</p>
            )}
            {state?.errors?.heroDescription && (
              <p className=" text-red-700 text-xs font-semibold">
                {state.errors.heroDescription}
              </p>
            )}
          </div>
          <div className=" shadow-md p-6  rounded-md border-l-4 border-amber-400 border-t-1 space-y-2">
            <h2 className=" text-sm font-semibold">Sub Title</h2>

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
        <p className=" text-xs font-bold">Benefits</p>
        <div className=" my-4 space-y-4 max-w-2xl">
          {allBenefits.length === 0 && (
            <div className="p-10 text-center text-muted-foreground border rounded-md space-y-3">
              <p className=" ">No benefits found.</p>
              <p className=" text-xs">
                Please click{" "}
                <span className=" font-bold text-muted-foreground">
                  Add Benefit
                </span>{" "}
                to create new benefits.
              </p>
            </div>
          )}
          {allBenefits.length > 0 && (
            <p>
              Total benefits:{" "}
              <span className=" font-bold">{allBenefits.length}</span>
            </p>
          )}
          {allBenefits.map((benefit) => (
            <div
              key={benefit.id}
              className=" shadow-md p-6  rounded-md border-l-4 border-blue-400 border-t-1 space-y-2"
            >
              <Accordion
                type="single"
                collapsible
                className="w-full"
                defaultValue=""
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className=" cursor-pointer">
                    {benefit.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className=" text-muted-foreground">
                      {benefit.description}
                    </p>
                    <div className=" flex justify-end gap-2">
                      <UpdateBenefitModal benefit={benefit} />
                      <DeleteBenefitModal
                        id={benefit.id}
                        title={benefit.title}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ParterSection;
