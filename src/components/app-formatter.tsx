import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "#/components/ui/resizable";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "#/components/ui/card";
import { createPortal } from "react-dom";
import { Button } from "#/components/ui/button";
import { CopyIcon, EraserIcon, WrapTextIcon } from "lucide-react";

import { Toggle } from "#/components/ui/toggle";
import { toast } from "sonner";

type FormatResult =
  | { status: "success"; text: string }
  | { status: "error"; message: string };

export type FormatFn = (input: string) => FormatResult;

type Props = {
  formatFn: FormatFn;
};

const DEFAULT_RESULT: FormatResult = { status: "success", text: "" };

export function AppFormatter({ formatFn }: Props) {
  const [input, setInput] = useState("");
  const [wrapText, setWrapText] = useState(false);

  const result = input ? formatFn(input) : DEFAULT_RESULT;
  const outputText = result.status === "success" ? result.text : "";

  async function copyOutput() {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    toast("Copied to clipboard", {
      description: "The formatted text has been copied to your clipboard.",
    });
  }

  function clearInput() {
    setInput("");
  }

  return (
    <>
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel id="input" minSize={300}>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text to format"
          />
        </ResizablePanel>
        <ResizableHandle withHandle className="mx-4" />
        <ResizablePanel id="output" minSize={300} className="relative">
          {result.status === "error" ? (
            <Card className="border-destructive/30 bg-destructive/10 absolute inset-0 rounded-none shadow-none">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="bg-destructive/10 text-destructive flex size-8 items-center justify-center rounded-full">
                    !
                  </div>
                  <CardTitle className="text-destructive text-base">
                    Parsing error
                  </CardTitle>
                </div>
                <CardDescription>
                  Something went wrong while parsing the input.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-background/80 text-muted-foreground max-h-40 overflow-auto border p-3 text-xs">
                  <code>{result.message}</code>
                </pre>
              </CardContent>
            </Card>
          ) : (
            <TextArea
              value={result.text}
              readOnly
              wrap={wrapText ? "soft" : "off"}
            />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
      <ToolbarPortal>
        <div className="flex items-center gap-2">
          <Toggle pressed={wrapText} onPressedChange={setWrapText}>
            <WrapTextIcon className="size-4" />
            <span className="hidden lg:block">Wrap Text</span>
          </Toggle>
          <Button
            type="button"
            variant="outline"
            onClick={copyOutput}
            disabled={!outputText}
          >
            <CopyIcon className="size-4" />
            <span className="hidden lg:block">Copy</span>
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={clearInput}
            disabled={!input}
          >
            <EraserIcon className="size-4" />
            <span className="hidden lg:block">Clear</span>
          </Button>
        </div>
      </ToolbarPortal>
    </>
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="bg-primary/10 block h-full min-h-0 w-full resize-none overflow-auto rounded-none border-0 p-4 font-mono text-sm outline-none focus:ring-0"
      {...props}
    />
  );
}

function ToolbarPortal({ children }: PropsWithChildren) {
  const [toolbarEl, setToolbarEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setToolbarEl(document.getElementById("toolbar"));
  }, []);

  if (!toolbarEl) {
    return null;
  }

  return createPortal(children, toolbarEl);
}
