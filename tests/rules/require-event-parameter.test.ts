import { RuleTester } from "@typescript-eslint/rule-tester";
import { requireEventParameter } from "../../lib/rules/require-event-parameter.ts";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      }
    }
  }
});
ruleTester.run("require-event-parameter", requireEventParameter, {
  valid: [
    "element.addEventListener('click', (event) => {});",
    "element.addEventListener('click', async (event) => {});",
    "element.addEventListener('click', _ => {}, {});",
    "element.addEventListener('click', function(event) {});",
    "element.addEventListener('click', async function(event) {});",
    "element.addEventListener('click', function(_) {}, {});"
  ],
  invalid: [{
      code: "element.addEventListener('click', func);",
      output: "element.addEventListener('click', (event) => func(event));",
      errors: [{
        messageId: "issue:missingEventParameter",
        suggestions: [{
          messageId: "fix:addEventParameter",
          output: "element.addEventListener('click', (event) => func(event));"
        }]
      }]
    },
    {
      code: "element.addEventListener('click', other.func);",
      output: "element.addEventListener('click', (event) => other.func(event));",
      errors: [{
        messageId: "issue:missingEventParameter",
        suggestions: [{
          messageId: "fix:addEventParameter",
          output: "element.addEventListener('click', (event) => other.func(event));"
        }]
      }]
    },
    {
      code: "element.addEventListener('click', () => {});",
      output: "element.addEventListener('click', (_event) => {});",
      errors: [{
        messageId: "issue:missingEventParameter",
        suggestions: [{
          messageId: "fix:addEventParameter",
          output: "element.addEventListener('click', (_event) => {});"
        }]
      }]
    },
    {
      code: "element.addEventListener('click', async () => {});",
      output: "element.addEventListener('click', async (_event) => {});",
      errors: [{
        messageId: "issue:missingEventParameter",
        suggestions: [{
          messageId: "fix:addEventParameter",
          output: "element.addEventListener('click', async (_event) => {});"
        }]
      }]
    },
    {
      code: "element.addEventListener('click', function() {});",
      output: "element.addEventListener('click', function(_event) {});",
      errors: [{
        messageId: "issue:missingEventParameter",
        suggestions: [{
          messageId: "fix:addEventParameter",
          output: "element.addEventListener('click', function(_event) {});",
        }]
      }]
    },
    {
      code: "element.addEventListener('click', async function() {});",
      output: "element.addEventListener('click', async function(_event) {});",
      errors: [{
        messageId: "issue:missingEventParameter",
        suggestions: [{
          messageId: "fix:addEventParameter",
          output: "element.addEventListener('click', async function(_event) {});",
        }]
      }]
    }
  ]
});
