import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import * as z from "zod";
import * as Sentry from "@sentry/tanstackstart-react";

const postThemeValidator = z.union([z.literal("light"), z.literal("dark")]);
export type T = z.infer<typeof postThemeValidator>;
const storageKey = "_preferred-theme";

export const getThemeServerFn = createServerFn().handler(async () => {
  return Sentry.startSpan({ name: "Getting theme cookie" }, async () => {
    return (getCookie(storageKey) || "dark") as T;
  });
});

export const setThemeServerFn = createServerFn({ method: "POST" })
  .inputValidator(postThemeValidator)
  .handler(async ({ data }) => {
    return Sentry.startSpan({ name: "Setting theme cookie" }, async () => {
      setCookie(storageKey, data);
    });
  });
