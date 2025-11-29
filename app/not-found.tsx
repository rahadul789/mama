import Link from "next/link";
import { NavbarDemo } from "./(appfront)/_components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div>
      <NavbarDemo />
      <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              404: Page not found
            </h2>
            <p className="mt-4">
              Oops! Looks like the page you were looking for wasn&apos;t found.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/">
                  <Home />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
