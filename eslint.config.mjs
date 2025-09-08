import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  {
    ignores: [
      "**/*.min.js",
      "node_modules/**",
      "vendor/**",
      "tmp/**",
      "log/**",
      "public/**",
      "app/assets/builds/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      "app/javascript/**/*.{js,jsx,ts,tsx}"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      // This is what fixes 'window is not defined'
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        location: "readonly"
      }
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    }
  }
);
