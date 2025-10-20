import Image from "next/image";

export default function ContentSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        {/* <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
          The Lyra ecosystem brings together our models.
        </h2> */}
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative mb-6 sm:mb-0">
            <h2 className="relative z-10 max-w-xl text-4xl font-medium lg:text-5xl">
              The 1Technologies ecosystem brings banking modules together.
            </h2>
          </div>

          <div className="relative space-y-4">
            <p className="text-muted-foreground">
              Our platform is more than a core.{" "}
              <span className="text-accent-foreground font-bold">
                It supports an entire banking ecosystem
              </span>
              — from products to APIs to analytics-so teams can{" "}
              <span className="text-accent-foreground font-bold">
                innovate safely and ship faster.
              </span>
            </p>
            <p className="text-muted-foreground">
              It connects every layer—core ledger, deposits, loans, payments,
              cards, digital channels, KYC/AML, and MIS—with open APIs and
              enterprise controls, helping financial institutions modernize
              without disruption.
            </p>

            <div className="pt-6">
              <blockquote className="border-l-4 pl-4">
                <p>
                  “Moving to 1Technologies felt like unlocking a new operating
                  tempo. The balance of security, speed, and flexibility lets us
                  launch products that are as compliant as they are delightful.”
                </p>

                <div className="mt-6 space-y-3">
                  <cite className="block font-medium">John Doe, CEO</cite>
                  {/* <img
                    className="h-5 w-fit dark:invert"
                    src="https://html.tailus.io/blocks/customers/nvidia.svg"
                    alt="Nvidia Logo"
                    height="20"
                    width="auto"
                  /> */}
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
