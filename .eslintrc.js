module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12, // Make sure this version aligns with the Node.js version you're using
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
  },
};
