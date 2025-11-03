// Flat ESLint config for ESLint v9+
// Mirrors previous .eslintrc.js (eslint:recommended + Prettier, envs, ignores)

const js = require("@eslint/js");
const globals = require("globals");
const pluginPrettier = require("eslint-plugin-prettier");
const configPrettier = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["prod/**", "dev/**"],
  },
  js.configs.recommended,
  configPrettier,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jquery,
      },
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];


