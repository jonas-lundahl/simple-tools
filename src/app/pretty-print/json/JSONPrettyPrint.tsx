"use client";
import { useState } from "react";
import { safeParseJSON } from "@/app/pretty-print/parse";
import { PrettyPrint } from "@/app/pretty-print/PrettyPrint";

export default function JSONPrettyPrint() {
  const [value, setValue] = useState("");
  const result = safeParseJSON(value);

  let prettifiedJSON;
  if (result.success) {
    prettifiedJSON = JSON.stringify(result.content, null, 2);
  } else {
    prettifiedJSON = "";
  }

  return (
    <PrettyPrint
      input={value}
      setInput={setValue}
      prettifiedInput={prettifiedJSON}
      success={result.success}
      error={result.success ? "" : result.error}
    />
  );
}
