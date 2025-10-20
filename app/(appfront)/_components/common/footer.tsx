"use client";

import {
  Box,
  Copyright,
  Facebook,
  Link,
  Linkedin,
  LocationEdit,
  Lock,
  Mail,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Button } from "@/components/ui/button";

interface FooterProps {
  id: number;
  title: string;
  address: string;
  email: string;
  copyright: string;
  facebook: string;
  linkedIn: string;
}

export default function Footer({ data }: { data: FooterProps }) {
  return (
    <div className="  max-w-7xl mx-auto px-4 py-2 my-20">
      <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
        <GridItem
          area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
          icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="1 Technologies"
          description={data.title}
          image="/logo.svg"
        />

        <GridItem
          area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
          icon={
            <LocationEdit className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Catch us"
          description={data.address}
        />

        <GridItem
          area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
          icon={<Link className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Find Us"
          description="it will never be shown anywhere"
          links={[
            {
              title: "Facebook",
              href: data.facebook,
              icon: <Facebook className="h-4 w-4 " />,
            },
            {
              title: "LinkedIn",
              href: data.linkedIn,
              icon: <Linkedin className="h-4 w-4 " />,
            },
          ]}
        />

        <GridItem
          area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
          icon={<Mail className="h-4 w-4 text-black dark:text-neutral-400" />}
          title="Mail Us"
          description={data.email}
        />

        <GridItem
          area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
          icon={
            <Copyright className="h-4 w-4 text-black dark:text-neutral-400" />
          }
          title="Copyright"
          description={`© ${data.copyright}`}
        />
      </ul>
    </div>
  );
}

interface Links {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  image?: string;
  links?: Links[];
}

const GridItem = ({
  area,
  icon,
  title,
  description,
  image,
  links,
}: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {image ? (
                <img src="/logo.svg" alt="logo" width={30} height={30} />
              ) : (
                icon
              )}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {links
                  ? links.map((link, idx) => (
                      <div
                        key={`link-${idx}`}
                        className="mt-2 flex items-center gap-2"
                      >
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" flex items-center gap-2 text-black dark:text-neutral-400 hover:underline"
                        >
                          <Button
                            className=" rounded-full cursor-pointer"
                            size="icon"
                            variant="outline"
                          >
                            {link.icon}
                          </Button>
                          {link.title}
                        </a>
                      </div>
                    ))
                  : description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
