"use client";

import { ComponentPropsWithoutRef } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = ComponentPropsWithoutRef<typeof Button>;

export default function SquareButton(props: Props) {
  const { className, ...delegated } = props;
  return (
    <Button
      {...delegated}
      variant="outline"
      className={cn("aspect-square h-full rounded-none", className)}
    />
  );
}
