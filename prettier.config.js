module.exports = {
  printWidth: 120, // Limit lines to 80 characters
  tabWidth: 2, // Set the number of spaces per indentation level
  useTabs: false, // Use spaces instead of tabs
  semi: true, // Add a semicolon at the end of statements
  singleQuote: true, // Use single quotes instead of double quotes
  trailingComma: 'all', // Add trailing commas wherever possible
  bracketSpacing: true, // Print spaces between brackets in object literals
  jsxBracketSameLine: false, // Put the > of a multi-line JSX element at the end of the last line
  arrowParens: 'always', // Always include parens for arrow functions
  proseWrap: 'preserve', // Do not wrap markdown text
  endOfLine: 'lf', // Use Line Feed only (\n), common on Linux and macOS as well as inside git repos
  jsxSingleQuote: false, // Use double quotes in JSX
  quoteProps: 'as-needed', // Change when properties in objects are quoted
  htmlWhitespaceSensitivity: 'css', // Respect the default value of CSS display property
  vueIndentScriptAndStyle: false, // Do not indent scripts and styles in Vue files
  embeddedLanguageFormatting: 'auto', // Format embedded code if Prettier can automatically identify it
};
