import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { WuiColorAlias } from "@wawawoom/wui";

import { ThemeContext } from "./ThemeContext";
import type { Theme } from "./ThemeContext";

const STORAGE_KEY = "wui-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

  if (stored) {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const ThemeProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const userChoice = localStorage.getItem(STORAGE_KEY);

    if (userChoice) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      setThemeState(media.matches ? "dark" : "light");
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, []);

  const setTheme = (value: Theme) => {
    localStorage.setItem(STORAGE_KEY, value);

    setThemeState(value);
  };

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";

    setTheme(next);
  };

  const getBlackColor = (): WuiColorAlias => {
    return theme === "dark"
      ? WuiColorAlias.NEUTRAL_0
      : WuiColorAlias.NEUTRAL_900;
  };

  const getWhiteColor = (): WuiColorAlias => {
    return theme === "dark"
      ? WuiColorAlias.NEUTRAL_900
      : WuiColorAlias.NEUTRAL_0;
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, getBlackColor, getWhiteColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
