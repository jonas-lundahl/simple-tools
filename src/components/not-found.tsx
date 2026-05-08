import { AppHeader } from "#/components/app-header";
import { AppSidebar } from "#/components/app-sidebar";
import { Button } from "#/components/ui/button";
import { SidebarProvider, SidebarInset } from "#/components/ui/sidebar";

export function NotFound() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader title="Page Not Found" />
        <main className="grid h-full place-items-center">
          <div className="flex flex-col items-center gap-2">
            <p>The page you are looking for does not exist.</p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
