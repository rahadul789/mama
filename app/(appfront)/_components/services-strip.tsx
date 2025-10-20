// // components/ServicesStrip.tsx
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  Database,
  FileChartColumn,
  Link2,
  Workflow,
  ScanFace,
  ArrowLeftRight,
} from "lucide-react";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const services = [
  { label: "Core Banking & Ledger", icon: Workflow },
  { label: "Accounts & Deposits (DPS/FDR)", icon: Banknote },
  { label: "Loans & Collections", icon: ArrowLeftRight },
  { label: "Payments (RTGS/BEFTN/SWIFT)", icon: Link2 },
  { label: "Digital Channels (Web/App/Agent)", icon: Smartphone },
  { label: "KYC/AML Screening", icon: ScanFace },
  { label: "Reporting & MIS", icon: FileChartColumn },
  { label: "Integrations (APIs/APEX/ORDS)", icon: Database },
  { label: "Security & Compliance", icon: ShieldCheck },
];

export default function LogoCloud() {
  const iconWrapClass = [
    "grid size-9 place-content-center rounded-lg bg-sky-500/10 transition-all duration-300",
    "group-hover:bg-sky-500/20",
    //   active && "bg-sky-500/20",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="bg-background overflow-hidden py-16">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm"> Powering modern banking </p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {services.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center font-bold gap-2 text-sm text-foreground/80"
                >
                  {/* <Icon size={18} className="opacity-80" aria-hidden="true" /> */}
                  <span className={iconWrapClass}>
                    <Icon className="size-4 text-sky-500 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                  </span>
                  <span className="whitespace-nowrap">{label}</span>
                </div>
              ))}
            </InfiniteSlider>

            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
