module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["!**/*"],
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/strict",
    "react-app"
  ],
  // extends: ["custom", "react-app"],
  parserOptions: { 
    project: [require.resolve('./tsconfig.json'), require.resolve('./tsconfig.node.json')] 
  }
};