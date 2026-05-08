import { SidebarTrigger } from "#/components/ui/sidebar.tsx";
import { Separator } from "#/components/ui/separator";
import { ModeToggle } from "#/components/mode-toggle";

type Props = {
  title: string;
};

export function AppHeader({ title }: Props) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex-1" />
        <div id="toolbar" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <ModeToggle />
      </div>
    </header>
  );
}
