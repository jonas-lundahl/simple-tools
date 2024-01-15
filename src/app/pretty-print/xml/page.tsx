"use client";
import { useState } from "react";
import { safeParseJSON } from "@/app/pretty-print/parse";
import { PrettyPrint } from "@/app/pretty-print/PrettyPrint";

export default function XMLPage() {
  const [value, setValue] = useState("");
  const result = safeParseJSON(value);

  let prettifiedXML;
  if (result.success) {
    prettifiedXML = JSON.stringify(result.content, null, 2);
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
