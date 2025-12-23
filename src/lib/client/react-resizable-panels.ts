"use client";

import { type Layout } from "react-resizable-panels";

export const onLayoutChange =
  (groupId: string): ((layout: Layout) => void) =>
  (layout: Layout) => {
    document.cookie = `${groupId}=${JSON.stringify(layout)}`;
  };
