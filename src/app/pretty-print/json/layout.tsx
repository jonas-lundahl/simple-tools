import { PropsWithChildren } from "react";
import PrettyPrintLayout from "@/app/pretty-print/PrettyPrintLayout";

export default function JSONPrettyPrintLayout({ children }: PropsWithChildren) {
  return (
    <PrettyPrintLayout title="JSON Pretty Print">{children}</PrettyPrintLayout>
  );
}
