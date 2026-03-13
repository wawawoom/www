import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "WUI",
    brandImage: "https://next.wawawoom.fr/projects/cdn/wui/logo-wui.svg",
    brandUrl: "#",
  }),
});
