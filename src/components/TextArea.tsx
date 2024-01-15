"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";

type Props = {
  title: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  enableCopyButton?: boolean;
};

export const TextArea: FC<Props> = ({
  title,
  value,
  disabled,
  enableCopyButton,
  onChange,
}) => {
  return (
    <div className="flex flex-col flex-1 w-full h-full max-w-full max-h-full border-primary overflow-hidden border rounded-lg p-4 pr-0 pb-0">
      <div className="flex justify-between px-4 pb-2 mb-2 border-b">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {title}
        </h2>
        {enableCopyButton && (
          <Button variant="outline" size="icon">
            <ClipboardCopyIcon className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        )}
      </div>
      <textarea
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="font-mono outline-none resize-none bg-transparent flex-1 cursor-auto"
      />
    </div>
  );
};
