import { AppFormatter } from "#/components/app-formatter";
import type { FormatFn } from "#/components/app-formatter";
import { AppHeader } from "#/components/app-header";
import { createFileRoute } from "@tanstack/react-router";
import xmlFormat from "xml-formatter";

export const Route = createFileRoute("/_app/formatter/xml")({
  head: () => ({
    meta: [
      {
        title: "XML Formatter · Simple Tools",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppHeader title="XML Formatter" />
      <AppFormatter formatFn={formatFn} />
    </>
  );
}

const formatFn: FormatFn = (input) => {
  try {
    const text = xmlFormat(input, {
      lineSeparator: "\n",
      whiteSpaceAtEndOfSelfclosingTag: true,
      forceSelfClosingEmptyTag: true,
      collapseContent: true,
    });
    return { status: "success", text };
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }
};
