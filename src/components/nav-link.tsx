"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<typeof Link> {
  activeClassName?: string;
}

export default function NavLink(props: Props) {
  const { href, className, activeClassName, ...delegated } = props;
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      {...delegated}
      className={cn(className, isActive && activeClassName)}
    />
  );
}
