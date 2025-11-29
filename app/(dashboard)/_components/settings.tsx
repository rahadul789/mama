"use client";

import React, {
  useState,
  useEffect,
  useActionState,
  use,
  type ChangeEvent,
} from "react";
import { updateSettings } from "@/app/lib/actions";
import {
  Settings as SettingsIcon,
  BotMessageSquare,
  Info,
  Edit,
  Loader2,
  KeyRound,
  Sparkles,
  CircleQuestionMark,
} from "lucide-react";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ContextSection } from "./context-section";
import QuestionList from "./question-list";

/* ------------------------------------------------------ */
/*                 Reusable SectionCard                   */
/* ------------------------------------------------------ */
const SectionCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3 hover:shadow-md transition">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-lg bg-brand-teal/20 text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
    {children}
  </div>
);

interface SettingsProps {
  settings: Promise<{ id: number; pin: string }>;
  aiSettings: Promise<{ id: number; context: string; questions: string[] }>;
}

const SettingsSection = ({
  settings: item,
  aiSettings: allAiSettings,
}: SettingsProps) => {
  const settings = use(item);
  const aiSettings = use(allAiSettings);

  const [isEdit, setIsEdit] = useState(false);
  const [contextValue, setContextValue] = useState(aiSettings.context || "");
  const [formData, setFormData] = useState({ pin: settings.pin || "" });

  const originalPin = settings.pin;
  const isChanged = formData.pin.trim() !== originalPin.trim();

  const [state, action, pending] = useActionState(updateSettings, undefined);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (state?.success) {
      setIsEdit(false);
      toast.success("Settings updated successfully.");
    }
  }, [state]);

  return (
    <section className="my-8 w-full max-w-3xl">
      <Tabs defaultValue="general">
        {/* ------------------------------------------- */}
        {/*                 SETTINGS TABS               */}
        {/* ------------------------------------------- */}
        <TabsList>
          <TabsTrigger
            value="general"
            className="flex items-center gap-1 cursor-pointer"
          >
            <SettingsIcon size={14} /> General Settings
          </TabsTrigger>
          <TabsTrigger
            value="ai"
            className="flex items-center gap-1 cursor-pointer"
          >
            <BotMessageSquare size={14} /> AI Settings
          </TabsTrigger>
        </TabsList>

        {/* ------------------------------------------- */}
        {/*               GENERAL SETTINGS TAB          */}
        {/* ------------------------------------------- */}
        <TabsContent value="general">
          <div className="mt-6 space-y-6">
            <SectionCard icon={KeyRound} title="Register PIN">
              <div className="flex items-center justify-between mb-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-6 w-6"
                    >
                      <Info size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This PIN is required during new user registration.</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {!isEdit ? (
                <p className="text-muted-foreground">{settings.pin}</p>
              ) : (
                <form action={action} className="flex items-center gap-3 pt-2">
                  <Input
                    name="pin"
                    value={formData.pin}
                    onChange={handleOnChange}
                    placeholder="Enter new PIN"
                  />

                  <Button
                    type="submit"
                    disabled={!isChanged || pending}
                    className="bg-brand-teal hover:bg-brand-teal/80 cursor-pointer"
                  >
                    {pending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEdit(false)}
                    disabled={pending}
                  >
                    Cancel
                  </Button>
                </form>
              )}

              {!isEdit && (
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full "
                    onClick={() => setIsEdit(true)}
                  >
                    <Edit size={16} />
                  </Button>
                </div>
              )}
            </SectionCard>
          </div>
        </TabsContent>

        {/* ------------------------------------------- */}
        {/*                   AI SETTINGS TAB           */}
        {/* ------------------------------------------- */}
        <TabsContent value="ai">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles size={16} /> AI Assistant Settings
              </CardTitle>
              <CardDescription>
                Configure how your AI behaves — context, instructions, and
                custom questions the assistant will always consider.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <ContextSection value={contextValue} onChange={setContextValue} />

              <QuestionList aiSettings={aiSettings} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SettingsSection;
