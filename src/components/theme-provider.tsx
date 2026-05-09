import { useRouter } from "@tanstack/react-router";
import { createContext, use, useState } from "react";
import type { PropsWithChildren } from "react";
import { setThemeServerFn } from "@/lib/theme";
import type { T as Theme } from "@/lib/theme";
import * as Sentry from "@sentry/react";

type ThemeContextVal = { theme: Theme; setTheme: (val: Theme) => void };
type Props = PropsWithChildren<{ theme: Theme }>;

const ThemeContext = createContext<ThemeContextVal | null>(null);

export function ThemeProvider({ children, theme: initialTheme }: Props) {
  const router = useRouter();
  const [theme, setThemeState] = useState(initialTheme);

  function setTheme(nextTheme: Theme) {
    const previousTheme = theme;
    setThemeState(nextTheme);

    setThemeServerFn({ data: nextTheme })
      .then(() => {
        router.invalidate();
      })
      .catch((error) => {
        Sentry.captureException(error);
        setThemeState(previousTheme);
      });
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const val = use(ThemeContext);
  if (!val) throw new Error("useTheme called outside of ThemeProvider!");
  return val;
}
