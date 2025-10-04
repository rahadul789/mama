"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, Plus, Trash2 } from "lucide-react";

/**
 * Permissive server action signature so any action state shape works.
 */
export type ServerAction = (prevState: any, formData: FormData) => Promise<any>;

interface EditableListFieldProps {
  id: number | string;
  label: string;
  name: string; // items submitted as `${name}[]`
  placeholder?: string;
  initialValues: string[];
  action: ServerAction;
  description?: string;
  className?: string;
}

export function EditableListField({
  id,
  label,
  name,
  placeholder = "Type and press Add",
  initialValues,
  action,
  description,
  className,
}: EditableListFieldProps) {
  // Working copy of list used for edits
  const [items, setItems] = useState<string[]>(initialValues ?? []);
  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Next.js server action plumbing
  const [state, formAction, pending] = useActionState<any, FormData>(
    action as any,
    {}
  );

  // If parent updates initialValues (refetch), sync them
  useEffect(() => {
    setItems(initialValues ?? []);
  }, [initialValues?.join("\u0001")]);

  // Exit edit mode after successful save
  useEffect(() => {
    if (state?.success) {
      setIsEditing(false);
    }
  }, [state?.success]);

  const hasChanges = useMemo(() => {
    try {
      return JSON.stringify(items) !== JSON.stringify(initialValues ?? []);
    } catch {
      return true;
    }
  }, [items, initialValues]);

  const addNew = () => {
    const value = newItem.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setNewItem("");
  };

  const updateAt = (index: number, value: string) => {
    setItems((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const removeAt = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const enterEdit = () => {
    setItems(initialValues ?? []); // start from source of truth
    setNewItem("");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setItems(initialValues ?? []);
    setNewItem("");
    setIsEditing(false);
  };

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1 mb-1">
            <Edit
              size={14}
              className="hover:scale-[1.2] cursor-pointer transition-transform"
              onClick={enterEdit}
            />
            <p className="font-semibold">{label}:</p>
          </div>
        </div>

        {/* Top-right controls */}
        {isEditing && (
          <form action={formAction} className="flex items-center gap-2">
            <input type="hidden" name="id" value={String(id)} />
            {items.map((v, i) => (
              <input
                key={`${name}-${i}`}
                type="hidden"
                name={`${name}[]`}
                value={v}
              />
            ))}
            <Button
              type="submit"
              size="sm"
              disabled={!hasChanges || pending}
              className="gap-2"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={cancelEdit}
              disabled={pending}
            >
              Cancel
            </Button>
          </form>
        )}
      </div>

      {/* CONTENT */}
      {!isEditing ? (
        // Read-only list
        <ul className=" list-disc list-inside space-y-2 text-sm text-muted-foreground">
          {items.length === 0 ? (
            <p className=" ml-2 text-muted-foreground">No items yet.</p>
          ) : (
            items.map((value, index) => (
              <li className="  ml-2" key={`${value}-${index}`}>
                {value}
              </li>
            ))
          )}
        </ul>
      ) : (
        // Edit mode: show inputs + delete buttons + add row
        <>
          <ul className="mt-3 space-y-2">
            {items.map((value, index) => (
              <li
                key={`${name}-${index}`}
                className="flex items-center gap-2 rounded-lg  p-2"
              >
                <Input
                  value={value}
                  onChange={(e) => updateAt(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700"
                  onClick={() => removeAt(index)}
                  aria-label={`Delete item ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>

          {/* Add new item */}
          <div className="mt-3 flex items-center gap-2">
            <Input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNew();
                }
              }}
            />
            <Button type="button" onClick={addNew} className="gap-2">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        </>
      )}

      {/* Server action surfaces */}
      {state?.errors ? (
        <div className="mt-2 rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-700">
          {Array.isArray(state.errors)
            ? state.errors.join(", ")
            : Object.entries(state.errors).map(([k, v]) => (
                <div key={k}>
                  <span className="font-medium">{k}: </span>
                  {Array.isArray(v) ? v.join(", ") : String(v)}
                </div>
              ))}
        </div>
      ) : null}

      {state?.success ? (
        <p className="mt-2 text-xs text-emerald-600">Saved successfully.</p>
      ) : null}
    </div>
  );
}

export default EditableListField;
