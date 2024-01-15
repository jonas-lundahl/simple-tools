import { PropsWithChildren } from "react";

export default function XMLPrettyPrintLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col p-4 gap-4 h-screen">
      <h1 className="self-start scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        XML Pretty Print
      </h1>
      <section className="flex gap-4 flex-grow">{children}</section>
    </main>
  );
}
