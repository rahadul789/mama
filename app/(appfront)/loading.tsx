"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 h-[85vh]">
      <div
        className="w-12 h-12 rounded-full border-4 border-transparent 
                      animate-spin 
                      bg-gradient-to-r from-blue-500 via-purple-500 to-brand-teal p-1"
      >
        <div className="animate-pulse-slow"></div>
        <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-full"></div>
      </div>
      <p className=" text-gray-600 tracking-wide  animate-fade-in text-sm">
        Loading, please wait...
      </p>
    </div>
  );
}
