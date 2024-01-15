import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-24 flex flex-col items-center gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Simple Tools
      </h1>
      <section className="border-primary rounded-lg border p-4">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Pretty Printing
        </h2>
        <div className="flex gap-8 items-center justify-center">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/pretty-print/json"
          >
            JSON
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/pretty-print/xml"
          >
            XML
          </Link>
        </div>
      </section>
    </main>
  );
}
