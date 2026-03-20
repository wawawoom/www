// `react-native-reanimated` / `react-native-worklets` need a single modern Babel toolchain.
// Root `package.json` pnpm.overrides align @babel/* versions (see monorepo root).
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Must stay last (Reanimated / Worklets).
      "react-native-reanimated/plugin",
    ],
  };
};
