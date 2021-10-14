const OFF = 0;
// const WARNING = 1
// const ERROR = 2

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    jest: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    allowImportExportEntryWhere: true,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  plugins: ["react-hooks", "jsx-a11y"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": OFF,
    "@typescript-eslint/no-empty-function": OFF,
    "@typescript-eslint/no-explicit-any": OFF,
    "@typescript-eslint/no-var-requires": OFF,
    "@typescript-eslint/ban-types": OFF,
    "@typescript-eslint/no-namespace": OFF,
    "@typescript-eslint/ban-ts-comment": OFF,
    "import/export": OFF,
    "import/first": "warn",
    "import/no-duplicates": "warn",
    "import/order": "warn",
    "import/no-named-as-default": OFF,
    "import/no-unresolved": OFF,
    "react/react-in-jsx-scope": OFF,
    "react/prop-types": OFF,
    "react/display-name": OFF
  },
  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "import/noduplicates": OFF
      }
    },
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": OFF,
        "@typescript-eslint/explicit-module-boundary-types": OFF
      }
    }
  ]
};
