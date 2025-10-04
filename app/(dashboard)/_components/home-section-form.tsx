"use client";

import { updateHome } from "@/app/lib/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import {
  ChangeEvent,
  use,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

interface HomeSectionFormProps {
  item: Promise<{
    id: number;
    title: string;
    subTitle: string;
    buttonText: string;
    features: string[];
  }>;
}

const HomeSectionForm = ({ item: homeItem }: HomeSectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [feature, setFeature] = useState("");
  const item = use(homeItem);
  const featureRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: item.title || "",
    subTitle: item.subTitle || "",
    buttonText: item.buttonText || "",
    features: item.features || [],
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [state, action, pending] = useActionState(updateHome, undefined);

  const addFeatures = (feature: string) => {
    if (feature === "" || feature.trim() === "") return;
    setFormData((prevState) => ({
      ...prevState,
      features: [...prevState.features, feature],
    }));
    if (featureRef.current) {
      featureRef.current.value = "";
      setFeature("");
    }
  };

  const removeFeatures = (idx: number) => {
    setFormData((prevState) => ({
      ...prevState,
      features: prevState.features.filter((_, index) => index !== idx),
    }));
  };

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Data updated successfully.");
    }
  }, [state]);

  return (
    <form action={action}>
      <div className=" my-8 space-y-4 max-w-2xl">
        <div className=" shadow-md p-6  rounded-md border-l-4 border-brand-teal border-t-1 space-y-2">
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
        <div className=" shadow-md p-6  rounded-md border-l-4 border-brand-red border-t-1 space-y-2">
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
          {state?.errors?.title && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.subTitle}
            </p>
          )}
        </div>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-violet-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Features</h2>
          <div className=" flex gap-2 flex-wrap">
            {formData.features.map((feature, idx) => (
              <Badge key={idx} className=" select-none">
                {feature}
                {isEdit && (
                  <div
                    onClick={() => removeFeatures(idx)}
                    className=" cursor-pointer"
                  >
                    <X className=" p-1 hover:text-red-600" />
                  </div>
                )}
              </Badge>
            ))}
          </div>

          {isEdit && (
            <>
              <Input
                placeholder="Add features"
                onChange={(e) => {
                  setFeature(e.target.value);
                }}
                ref={featureRef}
              />
              {state?.errors?.features && (
                <p className=" text-red-700 text-xs font-semibold ">
                  {state.errors.features}
                </p>
              )}
              <input
                type="hidden"
                name="features"
                value={JSON.stringify(formData.features)}
              />
              <div className=" flex justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    addFeatures(feature);
                  }}
                >
                  Add
                </Button>
              </div>
            </>
          )}
        </div>
        <div className=" shadow-md p-6  rounded-md border-l-4 border-amber-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Button Text</h2>
          {isEdit ? (
            <Input
              name="buttonText"
              id="buttonText"
              value={formData.buttonText}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.buttonText}</p>
          )}
          {state?.errors?.title && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.buttonText}
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

export default HomeSectionForm;
