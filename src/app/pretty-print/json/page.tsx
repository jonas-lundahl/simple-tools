"use client";
import { TextArea } from "@/components/TextArea";
import { useState } from "react";
import { safeParseJSON } from "@/app/pretty-print/parse";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function JSONPage() {
  const [value, setValue] = useState("");
  const result = safeParseJSON(value);

  let prettifiedJSON;
  if (result.success) {
    prettifiedJSON = JSON.stringify(result.content, null, 2);
  } else {
    prettifiedJSON = "";
  }

  return (
    <>
      <section className="flex gap-4 flex-grow overflow-hidden">
        <TextArea title="Input" value={value} onChange={setValue} />
        <TextArea title="Output" enableCopyButton value={prettifiedJSON} />
      </section>
      {value !== "" && !result.success && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>An error occurred</AlertTitle>
          <AlertDescription>{result.error}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
