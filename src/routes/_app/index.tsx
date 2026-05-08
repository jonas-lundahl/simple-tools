import { AppHeader } from "#/components/app-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppHeader title="Simple Tools" />;
}
