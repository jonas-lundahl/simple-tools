import { Metadata } from "next";
import JSONPrettyPrint from "@/app/pretty-print/json/JSONPrettyPrint";

export const metadata: Metadata = {
  title: `${process.env.APP_TITLE} | JSON Pretty Print`,
};

export default function JSONPage() {
  return <JSONPrettyPrint />;
}
