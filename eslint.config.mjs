import ESLint from '@eslint/js';
import Stylistic from '@stylistic/eslint-plugin';
import TsESLint from 'typescript-eslint';

export default [
  ESLint.configs.recommended,
  Stylistic.configs['disable-legacy'],
  ...TsESLint.configs.strictTypeChecked,
  ...TsESLint.configs.stylisticTypeChecked,
  {
    files: [
      "**/*.ts"
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
    plugins: {
      Stylistic
    },
    rules: {
      "curly": ["error", "multi-or-nest", "consistent"],
      "eqeqeq": "error",
      "no-var": "error",
      "object-shorthand": ["error", "consistent"],
      "operator-assignment": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "require-await": "error",
      "Stylistic/quotes": [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: "avoidEscape"
        }
      ],
      "Stylistic/semi": [2, "always"],
      "Stylistic/no-extra-semi": "error",
      "Stylistic/no-mixed-operators": [
        "error",
        {
          groups: [
            ["&", "|", "^", "~", "<<", ">>", ">>>", "==", "!=", "===", "!==", ">", ">=", "<", "<=", "&&", "||", "in", "instanceof"]
          ]
        }
      ],
      "Stylistic/nonblock-statement-body-position": ["error", "below"],
      "Stylistic/quotes": [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: "avoidEscape"
        }
      ],
      "Stylistic/quote-props": ["error", "consistent-as-needed"],
      "Stylistic/semi": "error",
      "Stylistic/spaced-comment": ["error", "always", { exceptions: ["*"] }]
    }
  }
];
