"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { BasicTooltip } from "@/components/BasicTooltip";

type Props = {
  title: string;
  value: string;
  disabled?: boolean;
  setValue?: (value: string) => void;
  enableCopyButton?: boolean;
  enableClearButton?: boolean;
};

export const TextArea: FC<Props> = ({
  title,
  value,
  disabled,
  enableCopyButton,
  enableClearButton,
  setValue,
}) => {
  return (
    <div className="flex flex-col flex-1 w-full h-full max-w-full max-h-full border-primary overflow-hidden border rounded-lg p-4 pr-0 pb-0">
      <div className="flex justify-between px-4 pb-2 mb-2 border-b mr-4">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {title}
        </h2>
        {enableCopyButton && (
          <BasicTooltip label="Copy to clipboard">
            <Button
              disabled={value === ""}
              variant="outline"
              size="icon"
              onClick={() => copyToClipboard(value)}
            >
              <ClipboardCopyIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </BasicTooltip>
        )}
        {enableClearButton && (
          <BasicTooltip label="Clear input">
            <Button
              disabled={value === ""}
              variant="outline"
              size="icon"
              onClick={() => setValue?.("")}
            >
              <TrashIcon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </BasicTooltip>
        )}
      </div>
      <textarea
        value={value}
        disabled={disabled}
        onChange={(e) => setValue?.(e.target.value)}
        className="font-mono outline-none resize-none bg-transparent flex-1 cursor-auto"
      />
    </div>
  );
};

const copyToClipboard = (value: string) => {
  navigator.clipboard
    .writeText(value)
    .then(() =>
      toast.success("Copy to clipboard", {
        description: "Content has been copied to your clipboard.",
        dismissible: true,
        action: {
          label: "OK",
          onClick: () => {},
        },
      }),
    )
    .catch(() =>
      toast.error("Copy to clipboard failed", {
        description: "Content could not be copied to clipboard.",
        dismissible: true,
        action: {
          label: "OK",
          onClick: () => {},
        },
      }),
    );
};
