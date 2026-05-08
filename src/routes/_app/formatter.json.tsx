import { AppFormatter } from "#/components/app-formatter";
import type { FormatFn } from "#/components/app-formatter";
import { AppHeader } from "#/components/app-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/formatter/json")({
  head: () => ({
    meta: [
      {
        title: "JSON Formatter · Simple Tools",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppHeader title="JSON Formatter" />
      <AppFormatter formatFn={formatFn} />
    </>
  );
}

const formatFn: FormatFn = (input) => {
  try {
    const parsed = JSON.parse(input);
    return { status: "success", text: JSON.stringify(parsed, null, 2) };
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }
};
