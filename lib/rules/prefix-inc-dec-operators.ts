import { AST_NODE_TYPES, ESLintUtils, TSESLint } from "@typescript-eslint/utils";

export const prefixIncDecOperators = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "suggestion",
    docs: {
      description: "Prefer prefix increment/decrement operators over postfix operators"
    },
    fixable: "code",
    hasSuggestions: true,
    schema: [],
    messages: {
      "fix:postfixIncrement": "Replace postfix increment with prefix increment",
      "fix:postfixDecrement": "Replace postfix decrement with prefix decrement",
      "issue:postfixIncrement": "Prefer prefix increment over postfix increment",
      "issue:postfixDecrement": "Prefer prefix decrement over postfix decrement",
    }
  },
  create: (context) => {
    return {
      UpdateExpression: (node) => {
        // Detect `i++`
        if ((node.operator === "++") && !node.prefix) {
          if ((node.parent.type === AST_NODE_TYPES.ExpressionStatement) || (node.parent.type === AST_NODE_TYPES.ForStatement)) {
            const codeFixer = (fixer: TSESLint.RuleFixer): TSESLint.RuleFix => {
              return fixer.replaceText(node, `++${context.sourceCode.getText(node).replaceAll("+", "")}`);
            };
            context.report({
              node: node,
              messageId: "issue:postfixIncrement",
              fix: codeFixer,
              suggest: [{
                messageId: "fix:postfixIncrement",
                fix: codeFixer
              }]
            });
            return;
          }

          context.report({
            node: node,
            messageId: "issue:postfixIncrement",
          });

          return;
        }

        // Detect `i--`
        if ((node.operator === "--") && !node.prefix) {
          if ((node.parent.type === AST_NODE_TYPES.ExpressionStatement) || (node.parent.type === AST_NODE_TYPES.ForStatement)) {
            const codeFixer = (fixer: TSESLint.RuleFixer): TSESLint.RuleFix => {
              return fixer.replaceText(node, `--${context.sourceCode.getText(node).replaceAll("-", "")}`);
            };
            context.report({
              node: node,
              messageId: "issue:postfixDecrement",
              fix: codeFixer,
              suggest: [{
                messageId: "fix:postfixDecrement",
                fix: codeFixer
              }]
            });
            return;
          }

          context.report({
            node: node,
            messageId: "issue:postfixDecrement",
          });

          return;
        }
      }
    };
  }
});
