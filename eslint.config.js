import js from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        process: "readonly",
        console: "readonly",
      },
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      eqeqeq: "error",
      "no-console": 0,
    },
  },
  {
    files: [".eslintrc.js", ".eslintrc.cjs"],
    languageOptions: {
      sourceType: "script",
    },
    rules: {
      // Puedes agregar reglas específicas para estos archivos si es necesario
    },
  },
];
