module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["prod/**", "dev/**"],
};
