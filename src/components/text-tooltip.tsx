import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface Props extends ComponentPropsWithoutRef<typeof Tooltip> {
  text: string;
  children: ReactNode;
}

export default function TextTooltip(props: Props) {
  const { text, children, ...delegated } = props;

  return (
    <Tooltip {...delegated}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}
