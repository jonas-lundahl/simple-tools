"use server";

import { cookies } from "next/headers";
import { type Layout } from "react-resizable-panels";

export async function getDefaultPanelLayoutFromCookies(groupId: string) {
  const api = await cookies();
  const defaultLayoutString = api.get(groupId)?.value;
  return defaultLayoutString
    ? (JSON.parse(defaultLayoutString) as Layout)
    : undefined;
}
