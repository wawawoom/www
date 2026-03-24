// Monorepo: Metro must watch the library package outside apps/rn.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];

const designTokenEnum = path.resolve(
  monorepoRoot,
  "libs/design-token/src/enum/index.ts"
);

const baseResolver = config.resolver ?? {};
const originalResolveRequest = baseResolver.resolveRequest;
config.resolver = {
  ...baseResolver,
  nodeModulesPaths: [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
  ],
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

module.exports = config;
