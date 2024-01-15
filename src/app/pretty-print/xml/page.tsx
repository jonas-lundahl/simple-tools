import { Metadata } from "next";
import XMLPrettyPrint from "@/app/pretty-print/xml/XMLPrettyPrint";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${process.env.APP_TITLE} | XML Pretty Print`,
};

export default function XMLPage() {
  return <XMLPrettyPrint />;
}
