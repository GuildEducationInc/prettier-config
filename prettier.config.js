module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: "es5",
  jsxSingleQuote: true,
  overrides: [

    {
      files: [
        ".babelrc",
        ".pretterrc",
        "*.json"
      ],
      excludeFiles: [
        "*.d.ts"
      ],
      options: {
        parser: "json"
      }
    },

    {
      files: [
        "*.ts",
        "*.tsx"
      ],
      excludeFiles: [
        "*.d.ts"
      ],
      options: {
        parser: "typescript"
      }
    }
  ]
}
