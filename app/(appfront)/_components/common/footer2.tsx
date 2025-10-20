import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HomeIcon, Mail } from "lucide-react";
const links = [
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Solution",
    href: "#",
  },
  {
    title: "Customers",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "About",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="m-1 rounded-3xl ">
      <div className="mx-auto max-w-5xl space-y-16 px-5 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-8">
          <Link
            href="/"
            aria-label="go home"
            className="  size-fit flex items-center gap-1"
          >
            <img src="/logo.svg" alt="logo" width={30} height={30} />
            <p className="font-medium text-md dark:text-white text-brand-red pb-[2px]">
              1<span className=" text-brand-teal">Technologies</span>
            </p>
          </Link>
          <div className="flex gap-3">
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                ></path>
              </svg>
            </Link>
            <Link
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted-foreground hover:text-primary block"
            >
              <svg
                className="size-6"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {footerLinks.map((linksGroup, index) => (
            <div key={index}>
              <span className="font-medium">{linksGroup.name}</span>
              <ul className="mt-4 list-inside space-y-4">
                {linksGroup.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-primary text-muted-foreground text-sm duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <span className="text-sm font-medium">Community</span>
            <ul className="mt-4 list-inside space-y-4">
              {communityLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-primary text-muted-foreground text-sm duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <form className="mt-12 w-full max-w-xs">
              <div className="space-y-2.5">
                <Label className="block text-sm font-medium" htmlFor="email">
                  Subscribe to our newsletter
                </Label>
                <Input
                  className="input variant-mixed sz-md"
                  placeholder="Your email"
                  type="email"
                  id="email"
                  required
                  name="email"
                />
              </div>
              <Button type="submit" className="mt-3">
                <span>Subscribe</span>
              </Button>
            </form>
          </div>
        </div> */}

        <div className="mx-auto max-w-5xl ">
          <div className="flex flex-wrap justify-between gap-6">
            <div className=" space-y-3">
              <a
                href="mailto:info@1technologiesltd.com"
                className="inline-flex items-centers gap-1 underline text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1 -mx-1"
                aria-label="Email info@1technologiesltd.com"
              >
                <Mail className="text-muted-foreground mt-[4px]" size={14} />
                <span className="text-sm ">info@1technologiesltd.com</span>
              </a>
              <div className=" flex gap-1 items-start">
                <HomeIcon
                  className=" text-muted-foreground mt-[4px]"
                  size={14}
                />
                <span className="text-muted-foreground  text-sm  max-w-xs">
                  House No:-44/i, Flat No:-2A,Block-D, Road-4, Bashundhara R/A,
                  Dhaka-1229
                </span>
              </div>
            </div>
            <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary block duration-150"
                >
                  <span>{link.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-muted mt-16 flex items-center justify-between rounded-md p-4 px-6 py-3">
          <span className="text-muted-foreground hover:text-primary text-sm">
            {" "}
            © 2025 ! 1Technologies, All rights reserved
          </span>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            Licence
          </Link>
        </div>
      </div>
    </footer>
  );
}
