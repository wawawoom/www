// Monorepo: Metro must watch the library package outside apps/rn.
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const resolveSearchRoots = [projectRoot, monorepoRoot];

/**
 * Resolve like Node from app or monorepo root. Prefer `paths` over createRequire —
 * Metro loads this config in contexts where resolution from package.json can miss
 * pnpm-linked deps.
 */
function resolveModuleToSourceFile(moduleName) {
  for (const root of resolveSearchRoots) {
    try {
      return require.resolve(moduleName, { paths: [root] });
    } catch {
      /* try next root */
    }
  }
  return null;
}

/** Package root directory for Metro `extraNodeModules` (pnpm-safe). */
function resolvePackageDir(packageName) {
  for (const root of resolveSearchRoots) {
    try {
      return path.dirname(
        require.resolve(`${packageName}/package.json`, { paths: [root] })
      );
    } catch {
      /* try next root */
    }
  }
  return null;
}

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];

const designTokenEnum = path.resolve(
  monorepoRoot,
  "libs/design-token/src/enum/index.ts"
);

const baseResolver = config.resolver ?? {};
const originalResolveRequest = baseResolver.resolveRequest;
const zustandPackageDir = resolvePackageDir("zustand");
const extraNodeModules = {
  ...(baseResolver.extraNodeModules ?? {}),
  ...(zustandPackageDir ? { zustand: zustandPackageDir } : {}),
};

config.resolver = {
  ...baseResolver,
  extraNodeModules,
  // Required with pnpm (isolated node_modules + symlinks into .pnpm); otherwise Metro
  // often fails to resolve packages like @react-navigation/native.
  unstable_enableSymlinks: true,
  nodeModulesPaths: [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(monorepoRoot, "node_modules"),
  ],
  resolveRequest: (context, moduleName, platform) => {
    if (moduleName === "@wawawoom/design-token/enum") {
      return { filePath: designTokenEnum, type: "sourceFile" };
    }

    // Metro's resolver often misses pnpm-linked deps; Node resolution finds them reliably.
    if (moduleName.startsWith("@react-navigation/")) {
      const filePath = resolveModuleToSourceFile(moduleName);
      if (filePath) {
        return { filePath, type: "sourceFile" };
      }
    }

    if (moduleName === "zustand" || moduleName.startsWith("zustand/")) {
      const filePath = resolveModuleToSourceFile(moduleName);
      if (filePath) {
        return { filePath, type: "sourceFile" };
      }
    }

    if (originalResolveRequest) {
      return originalResolveRequest(context, moduleName, platform);
    }
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;
