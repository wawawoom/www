import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Configure base path for deployment
    config.base = '/projects/wui/';
    // Configure output directory to be in libs/wui/dist_storybook
    if (config.build) {
      config.build.outDir = resolve(__dirname, '../dist_storybook');
    }
    return config;
  },
};

export default config;
