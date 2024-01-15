import { PropsWithChildren } from "react";
import PrettyPrintLayout from "@/app/pretty-print/PrettyPrintLayout";

export default function XMLPrettyPrintLayout({ children }: PropsWithChildren) {
  return (
    <PrettyPrintLayout title="XML Pretty Print">{children}</PrettyPrintLayout>
  );
}
