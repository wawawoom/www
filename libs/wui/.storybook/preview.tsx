import React, { useEffect } from "react";

import type { Preview } from "@storybook/react";

import "../src/styles/wui.css";

function BodyTheme({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.setAttribute("data-wui-theme", theme);

    if (theme === "light") {
      document.body.style.backgroundColor = "var(--wui-color-alias-neutral-0)";
    } else {
      document.body.style.backgroundColor =
        "var(--wui-color-alias-neutral-900)";
    }

    return () => {
      document.body.removeAttribute("data-wui-theme");
      document.body.style.minHeight = "";
      document.body.style.backgroundColor = "";
    };
  }, [theme]);
  return <>{children}</>;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Thème global (light / dark)",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals?.theme ?? "light";
      return (
        <BodyTheme theme={theme}>
          <Story />
        </BodyTheme>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
