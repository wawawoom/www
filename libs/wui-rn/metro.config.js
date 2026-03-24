// Learn more https://docs.expo.io/guides/customizing-metro
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

config.watchFolders = [
  ...(config.watchFolders ?? []),
  monorepoRoot,
];

const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

const designTokenEnum = path.resolve(
  projectRoot,
  "../design-token/src/enum/index.ts"
);

const mergedConfig = withStorybook(config);
const originalResolveRequest = mergedConfig.resolver?.resolveRequest;
mergedConfig.resolver = {
  ...mergedConfig.resolver,
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName === "@wawawoom/design-token/enum") {
      return { filePath: designTokenEnum, type: "sourceFile" };
    }
    if (originalResolveRequest) {
      return originalResolveRequest(context, moduleName, platform);
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = mergedConfig;
