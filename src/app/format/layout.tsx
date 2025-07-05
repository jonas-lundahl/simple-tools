import { PropsWithChildren } from "react";
import { Code, FileText } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import SquareButton from "~/components/square-button";
import NavLink from "~/components/nav-link";

export default function FormatLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <header className="bg-muted flex h-12 flex-shrink-0 flex-row">
        <SquareButton asChild>
          <NavLink
            href="/format/json"
            className="opacity-50"
            activeClassName="opacity-100"
          >
            <Code className="text-primary h-8 w-8" />
          </NavLink>
        </SquareButton>
        <SquareButton asChild>
          <NavLink
            href="/format/xml"
            className="opacity-50"
            activeClassName="opacity-100"
          >
            <FileText className="text-primary h-8 w-8" />
          </NavLink>
        </SquareButton>
        <div className="flex-1" />
        <ModeToggle />
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
