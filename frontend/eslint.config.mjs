import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import prettier from "eslint-config-next";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    name: 'custom-rules',
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      // Sort imports & exports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Khuyến nghị: tránh import trùng lặp, thêm dòng trống
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
    },
  },
  {
    name: 'prettier',
    rules: prettier.rules,
  },
];

export default eslintConfig;
