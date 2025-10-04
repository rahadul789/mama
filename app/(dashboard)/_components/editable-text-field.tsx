"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Loader2, LucideCheck, Trash2, X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * The server action signature expected by useActionState.
 * Adjust if your action returns a different shape.
 */
type ServerAction = (
  prevState: any,
  formData: FormData
) => Promise<{
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}>;

type EditableTextFieldProps = {
  id: number;
  label: string;
  name: string; // form field name the server action expects, e.g. "position"
  placeholder?: string;
  initialValue: string;
  action: ServerAction;
  /** Optional formatter for read mode */
};

export function EditableTextField({
  id,
  label,
  name,
  placeholder,
  initialValue,
  action,
}: EditableTextFieldProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const [state, formAction, pending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.success) {
      setEditing(false);
      toast.success(state?.message || `${label} updated successfully.`);
    } else if (state?.errors) {
      // Show the first error found
      const first = Object.values(state.errors)[0]?.[0];
      if (first) toast.error(first);
    }
  }, [state, label]);

  return (
    <div>
      <div className="flex items-center gap-1">
        <Edit
          size={14}
          className="hover:scale-[1.2] cursor-pointer transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
        />
        <p className="font-semibold">{label}:</p>
      </div>

      {editing ? (
        <form
          action={formAction}
          onClick={(e) => e.stopPropagation()}
          className="mt-1"
        >
          <div className="flex w-full max-w-sm items-center gap-1">
            <Input
              type="text"
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <input type="hidden" name="id" value={id} />

            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => {
                  setValue(initialValue); // revert
                  setEditing(false);
                }}
              >
                <X size={16} />
              </Button>

              <Button
                type="submit"
                variant="default"
                size="icon"
                disabled={pending}
              >
                {pending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <LucideCheck size={16} />
                )}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <p className="text-sm text-gray-600 mt-1">{initialValue}</p>
      )}
    </div>
  );
}
