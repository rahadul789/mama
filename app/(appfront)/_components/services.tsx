import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Cpu,
  Fingerprint,
  Pencil,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Settings,
  Cloud,
  Building2,
  Network,
  CloudUpload,
  MessageCircleQuestion,
  GraduationCap,
  UserPlus,
  Lightbulb,
  ArrowRight,
  Headphones,
  ShieldCheck,
  LucideIcon,
} from "lucide-react";

const features = [
  {
    title: "Implementation Services",
    subTitle:
      "End-to-end implementation of banking solutions with expert guidance and seamless integration",
    description:
      "A successful implementation requires a blend of in-depth experience and enhanced skills. Our end-to-end implementations incorporate established methodologies derived from our combined technical and domain experience. Our extensive understanding of Temenos products allows our clients to utilize the internal workings of the product without sacrificing any of their needs. 1 Technologies Ltd follows the proven Temenos TIM implementation methodology to deliver projects within budget, on target and with superior quality.",
    Icon: Zap,
  },

  {
    title: "Upgrade and Technology Migration Services",
    subTitle:
      "End-to-end implementation of banking solutions with expert guidance and seamless integration",
    description: "ffffffffffffffffff",
    Icon: Zap,
  },
  {
    title: "Implementation Services",
    subTitle:
      "End-to-end implementation of banking solutions with expert guidance and seamless integration",
    description: "ffffffffffffffffff",
    Icon: Zap,
  },
  {
    title: "Implementation Services",
    subTitle:
      "End-to-end implementation of banking solutions with expert guidance and seamless integration",
    description: "ffffffffffffffffff",
    Icon: Zap,
  },
  {
    title: "Implementation Services",
    subTitle:
      "End-to-end implementation of banking solutions with expert guidance and seamless integration",
    description: "ffffffffffffffffff",
    Icon: Zap,
  },
  {
    title: "Implementation Services",
    subTitle:
      "End-to-end implementation of banking solutions with expert guidance and seamless integration",
    description: "ffffffffffffffffff",
    Icon: Zap,
  },
];

export default function Features() {
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-balance text-4xl font-medium lg:text-5xl">
            Everything Your Bank Needs
          </h2>
          <p>
            Comprehensive banking solutions built for the modern financial
            landscape
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, subTitle, description, Icon }, i) => {
            const active = i === 0; // first card is always "hovered"
            const cardClass = [
              "group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300",
              "border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900",
              "hover:border-sky-400 hover:shadow-[0_0_24px_rgba(56,189,248,0.45)]",
              active &&
                "border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.45)]",
            ]
              .filter(Boolean)
              .join(" ");

            const haloClass = [
              "pointer-events-none absolute inset-0 rounded-2xl",
              "bg-[radial-gradient(120px_120px_at_20%_-10%,rgba(56,189,248,0.25),transparent),radial-gradient(120px_120px_at_120%_120%,rgba(168,85,247,0.2),transparent)]",
              "blur-md transition-opacity duration-300",
              "opacity-0 group-hover:opacity-100",
              active && "opacity-100",
            ]
              .filter(Boolean)
              .join(" ");

            const iconWrapClass = [
              "grid size-9 place-content-center rounded-lg bg-sky-500/10 transition-all duration-300",
              "group-hover:bg-sky-500/20",
              active && "bg-sky-500/20",
            ]
              .filter(Boolean)
              .join(" ");

            const iconClass = [
              "size-4 text-sky-500 transition-all duration-300",
              "group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]",
              active && "drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={i} aria-selected={active} className={cardClass}>
                {/* Glow halo */}
                <span aria-hidden className={haloClass} />

                <div className="relative ">
                  <div className=" space-y-2">
                    <span className={iconWrapClass}>
                      <Icon className={iconClass} />
                    </span>
                    <h3 className="text-sm font-medium">{title}</h3>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 my-3">
                    {subTitle}
                  </p>
                </div>

                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        size="sm"
                        className=" pl-0 ml-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute bottom-0 right-2 text-xs "
                      >
                        Learn more
                        <ChevronRight className=" pt-1 " />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className=" my-5 space-y-2">
                          <span className="grid size-20 place-content-center rounded-lg bg-sky-500/10 transition-all duration-300 group-hover:bg-sky-500/20">
                            <Icon className=" size-12 text-sky-500 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                          </span>
                          <span>{title}</span>
                        </DialogTitle>
                        <DialogDescription className="text-sm font-medium">
                          {description}
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter className=" mt-6">
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
