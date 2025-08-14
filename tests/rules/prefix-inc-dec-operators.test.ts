import { RuleTester } from "@typescript-eslint/rule-tester";
import { prefixIncDecOperators } from "../../lib/rules/prefix-inc-dec-operators.ts";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      }
    }
  }
});
ruleTester.run("prefix-inc-dec-operators", prefixIncDecOperators, {
  valid: [
    "++i;",
    "--i;",
    "++obj.count;",
    "--obj.count;",
    "array[++i];",
    "array[--i];",
    "for (let i = 0; i < 3; ++i) {}",
    "for (let i = 3; i >= 0; --i) {}",
    "for (let i = ++j; i < 3; ) {}",
    "for (let i = --j; i < 3; ) {}",
  ],
  invalid: [{
      code: "i++;",
      errors: [{
        messageId: "issue:postfixIncrement",
        suggestions: [{
          messageId: "fix:postfixIncrement",
          output: "++i;"
        }]
      }]
    },
    {
      code: "i--;",
      errors: [{
        messageId: "issue:postfixDecrement",
        suggestions: [{
          messageId: "fix:postfixDecrement",
          output: "--i;"
        }]
      }]
    },
    {
      code: "obj.count++;",
      errors: [{
        messageId: "issue:postfixIncrement",
        suggestions: [{
          messageId: "fix:postfixIncrement",
          output: "++obj.count;"
        }]
      }]
    },
    {
      code: "obj.count--;",
      errors: [{
        messageId: "issue:postfixDecrement",
        suggestions: [{
          messageId: "fix:postfixDecrement",
          output: "--obj.count;"
        }]
      }]
    },
    {
      code: "array[i++];",
      errors: [{
        messageId: "issue:postfixIncrement"
      }]
    },
    {
      code: "array[i--];",
      errors: [{
        messageId: "issue:postfixDecrement"
      }]
    },
    {
      code: "for (let i = 0; i < 3; i++) {}",
      errors: [{
        messageId: "issue:postfixIncrement",
        suggestions: [{
          messageId: "fix:postfixIncrement",
          output: "for (let i = 0; i < 3; ++i) {}"
        }]
      }]
    },
    {
      code: "for (let i = 3; i >= 0; i--) {}",
      errors: [{
        messageId: "issue:postfixDecrement",
        suggestions: [{
          messageId: "fix:postfixDecrement",
          output: "for (let i = 3; i >= 0; --i) {}"
        }]
      }]
    },
    {
      code: "for (let i = j++; i < 3; ) {}",
      errors: [{
        messageId: "issue:postfixIncrement"
      }]
    },
    {
      code: "for (let i = j--; i >= 0; ) {}",
      errors: [{
        messageId: "issue:postfixDecrement"
      }]
    }
  ]
});
