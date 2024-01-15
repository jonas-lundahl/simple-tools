import { PropsWithChildren } from "react";

export default function JSONPrettyPrintLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col p-4 gap-4 h-screen">
      <h1 className="self-start scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        JSON Pretty Print
      </h1>
      {children}
    </main>
  );
}
