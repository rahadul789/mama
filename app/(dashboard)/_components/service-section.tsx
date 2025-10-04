"use client";

import { updateService, updateVision } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ChangeEvent, use, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import DeleteServiceModal from "./delete-service-modal";
import UpdateServiceModal from "./update-service-modal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ServiceSectionProps {
  item: Promise<{
    id: number;
    title: string;
    subTitle: string;
  }>;
  allServices: Promise<
    {
      id: number;
      serviceId: number;
      title: string;
      description: string;
    }[]
  >;
}

const ServiceSection = ({
  item: VisionItem,
  allServices,
}: ServiceSectionProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(VisionItem);
  const services = use(allServices);

  const [formData, setFormData] = useState({
    // heroTitle: item.heroTitle || "",
    title: item.title || "",
    subTitle: item.subTitle || "",
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

  const [state, action, pending] = useActionState(updateService, undefined);

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
                id="title"
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
          {services.length === 0 && (
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
          {services.length > 0 && (
            <p>
              Total jobs: <span className=" font-bold">{services.length}</span>
            </p>
          )}
          {services.map((service) => (
            <div
              key={service.id}
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
                    {service.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className=" text-muted-foreground">
                      {service.description}
                    </p>
                    <div className=" flex justify-end gap-2">
                      <UpdateServiceModal services={service} />
                      <DeleteServiceModal
                        id={service.id}
                        title={service.title}
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

export default ServiceSection;
