"use client";

import { updateFooter, updateHome } from "@/app/lib/actions";
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

interface FooterSectionFormProps {
  item: Promise<{
    id: number;
    title: string;
    address: string;
    email: string;
    copyright: string;
    facebook: string;
    linkedIn: string;
  }>;
}

const FooterSectionForm = ({ item: footerItem }: FooterSectionFormProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const item = use(footerItem);

  const [formData, setFormData] = useState({
    title: item.title || "",
    address: item.address || "",
    email: item.email || "",
    copyright: item.copyright || "",
    facebook: item.facebook || "",
    linkedIn: item.linkedIn || "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [state, action, pending] = useActionState(updateFooter, undefined);

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
        <div className=" shadow-md p-6  rounded-md border-l-4 border-violet-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Address</h2>

          {isEdit ? (
            <Input
              name="address"
              id="address"
              value={formData.address}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.address}</p>
          )}
          {state?.errors?.address && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.address}
            </p>
          )}
        </div>

        <div className=" shadow-md p-6  rounded-md border-l-4 border-amber-400 border-t-1 space-y-2">
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
        <div className=" shadow-md p-6  rounded-md border-l-4 border-green-400 border-t-1 space-y-2">
          <h2 className=" text-sm font-semibold">Copyright</h2>
          {isEdit ? (
            <Input
              name="copyright"
              id="copyright"
              value={formData.copyright}
              onChange={handleOnChange}
            />
          ) : (
            <p className=" text-muted-foreground">{item.copyright}</p>
          )}
          {state?.errors?.copyright && (
            <p className=" text-red-700 text-xs font-semibold">
              {state.errors.copyright}
            </p>
          )}
        </div>
        <div className=" space-y-4">
          <p className=" mt-10 font-semibold text-xs">Social links</p>
          <div className=" shadow-md p-6  rounded-md border-l-4 border-cyan-400 border-t-1 space-y-2">
            <h2 className=" text-sm font-semibold">Facebook</h2>
            {isEdit ? (
              <Input
                name="facebook"
                id="facebook"
                value={formData.facebook}
                onChange={handleOnChange}
              />
            ) : (
              <p className=" text-muted-foreground">{item.facebook}</p>
            )}
            {state?.errors?.facebook && (
              <p className=" text-red-700 text-xs font-semibold">
                {state.errors.facebook}
              </p>
            )}
          </div>
          <div className=" shadow-md p-6  rounded-md border-l-4 border-cyan-400 border-t-1 space-y-2">
            <h2 className=" text-sm font-semibold">LinkedIn</h2>
            {isEdit ? (
              <Input
                name="linkedIn"
                id="linkedIn"
                value={formData.linkedIn}
                onChange={handleOnChange}
              />
            ) : (
              <p className=" text-muted-foreground">{item.linkedIn}</p>
            )}
            {state?.errors?.linkedIn && (
              <p className=" text-red-700 text-xs font-semibold">
                {state.errors.linkedIn}
              </p>
            )}
          </div>
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

export default FooterSectionForm;
