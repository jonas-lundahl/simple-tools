"use client";
import { TextArea } from "@/components/TextArea";
import { FC } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {
  input: string;
  setInput: (input: string) => void;
  prettifiedInput: string;
  success: boolean;
  error: string;
};

export const PrettyPrint: FC<Props> = ({
  input,
  setInput,
  prettifiedInput,
  success,
  error,
}) => {
  return (
    <>
      <section className="flex gap-4 flex-grow overflow-hidden">
        <TextArea
          title="Input"
          enableClearButton
          value={input}
          setValue={setInput}
        />
        <TextArea
          title="Output"
          disabled
          enableCopyButton
          value={prettifiedInput}
        />
      </section>
      {input !== "" && !success && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>An error occurred</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </>
  );
};
