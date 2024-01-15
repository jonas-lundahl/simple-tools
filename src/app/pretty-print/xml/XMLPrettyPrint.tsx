"use client";
import { useState } from "react";
import { PrettyPrint } from "@/app/pretty-print/PrettyPrint";
import { prettyPrintXML, safeParseXML } from "@/app/pretty-print/xml/xml-parse";

export default function XMLPrettyPrint() {
  const [value, setValue] = useState("");
  const result = safeParseXML(value);

  let prettifiedXML;
  if (result.success) {
    prettifiedXML = prettyPrintXML(result.content);
  } else {
    prettifiedXML = "";
  }

  return (
    <PrettyPrint
      input={value}
      setInput={setValue}
      prettifiedInput={prettifiedXML}
      success={result.success}
      error={result.success ? "" : result.error}
    />
  );
}
