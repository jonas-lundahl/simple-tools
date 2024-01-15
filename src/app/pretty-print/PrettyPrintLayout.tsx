import { PropsWithChildren } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon } from "@radix-ui/react-icons";

export default function PrettyPrintLayout({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <main className="flex flex-col p-4 gap-4 h-screen">
      <div className="flex justify-between items-center">
        <h1 className="self-start scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          {title}
        </h1>
        <Link
          className={buttonVariants({ variant: "outline", size: "icon" })}
          href="/"
        >
          <HomeIcon className="h-[1.2rem] w-[1.2rem]" />
        </Link>
      </div>
      {children}
    </main>
  );
}
