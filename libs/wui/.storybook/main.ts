import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";

const config: StorybookConfig = {
  stories: [
    "../src/stories/Introduction.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../src/**/*.mdx",
  ],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false,
      },
    },
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@wawawoom/design-token/enum": resolve(
        __dirname,
        "../../design-token/src/enum/index.ts"
      ),
    };
    // Configure base path for deployment
    config.base = "/projects/wui/storybook/";
    // Configure output directory to be in libs/wui/dist_storybook
    if (config.build) {
      config.build.outDir = resolve(__dirname, "../dist_storybook");
    }
    return config;
  },
};

export default config;
