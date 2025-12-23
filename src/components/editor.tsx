"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { createContext, useContext, useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

import { Trash, Copy, WrapText } from "lucide-react";
import { toast } from "sonner";
import TextTooltip from "~/components/text-tooltip";
import { prettifyJson } from "~/lib/prettify.json";
import { prettifyXML } from "~/lib/prettify.xml";
import { useAreaHeight } from "~/lib/useAreaHeight";
import { type Layout } from "react-resizable-panels";
import { onLayoutChange } from "~/lib/client/react-resizable-panels";

const TextContext = createContext("");
const SetTextContext = createContext<(text: string) => void>(() => {});

const PlaceholderTextContext = createContext("");

const WrapContext = createContext(false);
const SetWrapContext = createContext<(enabled: boolean) => void>(() => {});

type Props = {
  title: string;
  placeholderText: string;
  variant: "xml" | "json";
  defaultLayout: Layout | undefined;
  groupId: string;
};

export default function Editor(props: Props) {
  const { title, placeholderText, variant, defaultLayout, groupId } = props;

  const prettyFn = variant === "xml" ? prettifyXML : prettifyJson;

  const [text, setText] = useState("");
  const [wrap, setWrap] = useState(false);

  const [prettified, error] = prettyFn(text);
  const style = useAreaHeight();

  return (
    <TextContext.Provider value={text}>
      <SetTextContext.Provider value={setText}>
        <PlaceholderTextContext.Provider value={placeholderText}>
          <WrapContext.Provider value={wrap}>
            <SetWrapContext.Provider value={setWrap}>
              <div className="flex h-full flex-col">
                <div className="flex shrink-0 flex-row items-center gap-2 border border-b-0 px-2 py-1">
                  <h1 className="text-3xl font-semibold tracking-tight">
                    {title}
                  </h1>
                  <div className="flex-1" />
                  <TextTooltip text="Toggle text wrapping">
                    <Button
                      variant={wrap ? "default" : "outline"}
                      size="icon"
                      onClick={() => setWrap((wrap) => !wrap)}
                    >
                      <WrapText className="size-4" />
                      <span className="sr-only">Toggle text wrapping</span>
                    </Button>
                  </TextTooltip>
                  <TextTooltip text="Copy to clipboard">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={!prettified}
                      onClick={() => copyToClipboard(prettified)}
                    >
                      <Copy className="size-4" />
                      <span className="sr-only">Copy to clipboard</span>
                    </Button>
                  </TextTooltip>
                  <TextTooltip text="Clear input">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={!text}
                      onClick={() => setText("")}
                    >
                      <Trash className="size-4" />
                      <span className="sr-only">Clear input</span>
                    </Button>
                  </TextTooltip>
                </div>
                <div className="flex-1" style={style}>
                  <ResizablePanelGroup
                    className="gap-2"
                    orientation="horizontal"
                    defaultLayout={defaultLayout}
                    onLayoutChange={onLayoutChange(groupId)}
                  >
                    <ResizablePanel id="left" minSize="30%">
                      <TextEditor />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel id="right" minSize="30%">
                      <TextPreview prettified={prettified} error={error} />
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
              </div>
            </SetWrapContext.Provider>
          </WrapContext.Provider>
        </PlaceholderTextContext.Provider>
      </SetTextContext.Provider>
    </TextContext.Provider>
  );
}

function TextEditor() {
  const text = useContext(TextContext);
  const setText = useContext(SetTextContext);

  return (
    <Textarea
      placeholder="Paste text to format"
      className="h-full resize-none overflow-auto rounded-none font-mono shadow-none"
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{
        maxHeight: "var(--area-height, 100%)",
      }}
    />
  );
}

type TextPreviewProps = {
  prettified: string;
  error: string;
};

function TextPreview(props: TextPreviewProps) {
  const text = useContext(TextContext);
  const placeholderText = useContext(PlaceholderTextContext);
  const wrap = useContext(WrapContext);
  const { prettified, error } = props;

  return (
    <div
      className={cn(
        "h-full w-full overflow-auto border px-3 py-2 text-base md:text-sm",
        !text && "flex items-center justify-center",
        error ? "font-mono whitespace-normal" : "",
        prettified && !error && "font-mono",
        wrap && prettified && !error
          ? "wrap-break-word whitespace-pre-wrap"
          : !error && "whitespace-pre",
      )}
      style={{
        maxHeight: "var(--area-height, 100%)",
      }}
    >
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Parsing failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : !text ? (
        <div className="text-muted-foreground select-none">
          {placeholderText}
        </div>
      ) : (
        prettified
      )}
    </div>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast("Copied to clipboard", {
        description: "Formatted text has been copied to your clipboard.",
      });
    })
    .catch(() => {
      toast("Failed copying to clipboard", {
        description:
          "Something went wrong trying to copy to clipboard. Make sure your browser allows this website to write text to your clipboard.",
      });
    });
}
