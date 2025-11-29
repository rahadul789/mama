"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Image from "next/image";
import { motion } from "framer-motion";

interface ServicesStripProps {
  data: {
    id: number;
    title: string;
    heading: string;
    url: string;
  }[];
}

/* 🎯 Pre-generated static particle positions */
const particlePositions = [
  { top: "12%", left: "8%" },
  { top: "36%", left: "18%" },
  { top: "68%", left: "10%" },
  { top: "22%", left: "78%" },
  { top: "56%", left: "85%" },
  { top: "80%", left: "60%" },
  { top: "14%", left: "55%" },
  { top: "70%", left: "30%" },
];

export default function ServicesStrip({ data }: ServicesStripProps) {
  return (
    <section className="relative overflow-hidden py-30 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl bg-background/40 backdrop-blur-sm">
      {/* 🔵 Soft glowing backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 
        bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)]
        blur-3xl opacity-40"
      />

      {/* 🟣 Optimized Floating Particle Layer */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand-teal/35 dark:bg-brand-teal/25"
            style={{
              top: pos.top,
              left: pos.left,
              width: 6,
              height: 6,
            }}
            animate={{
              y: [0, i % 2 === 0 ? -10 : 10, 0],
              opacity: [0.35, 0.7, 0.35],
            }}
            transition={{
              duration: 6 + i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="relative m-auto max-w-7xl px-6 group">
          <div className="flex flex-col items-center md:flex-row gap-8 md:gap-12">
            {/* Left Text */}
            <div className="md:max-w-48 md:border-r md:pr-6 text-center md:text-right">
              <p className="text-sm text-muted-foreground font-medium tracking-wide">
                {data[0]?.heading}
              </p>
            </div>

            {/* Slider */}
            <div className="relative py-4 md:flex-1">
              <InfiniteSlider speedOnHover={16} speed={36} gap={96}>
                {data.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 font-medium text-sm text-foreground/80"
                  >
                    <span
                      className="grid size-11 place-content-center rounded-xl 
                      bg-white/60 dark:bg-white/5 backdrop-blur-md border 
                      border-slate-200/60 dark:border-white/10 shadow-sm"
                    >
                      <Image
                        src={item.url}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="rounded-md"
                      />
                    </span>

                    <span className="whitespace-nowrap tracking-tight">
                      {item.title}
                    </span>
                  </div>
                ))}
              </InfiniteSlider>

              {/* Left & Right Fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-background to-transparent" />

              {/* Blur overlays */}
              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-20"
                direction="left"
                blurIntensity={1.2}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-20"
                direction="right"
                blurIntensity={1.2}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
