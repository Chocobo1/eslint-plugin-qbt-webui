import { AST_NODE_TYPES, ESLintUtils, TSESLint } from "@typescript-eslint/utils";

export const requireEventParameter = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce that event handlers in `addEventListener()` have an event parameter"
    },
    fixable: "code",
    hasSuggestions: true,
    schema: [],
    messages: {
      "fix:addEventParameter": "Add an event parameter to the event handler in `addEventListener()`",
      "issue:missingEventParameter": "Event handler in `addEventListener()` must have an event parameter",
    }
  },
  create: (context) => {
    return {
      CallExpression: (node) => {
        if (!((node.callee.type === AST_NODE_TYPES.MemberExpression) && (node.callee.property.type === AST_NODE_TYPES.Identifier) && (node.callee.property.name === "addEventListener")))
          return;

        // invalid code: `addEventListener()` has no `listener` argument
        if (node.arguments.length <= 1)
          return;

        const listenerArg = node.arguments[1];
        switch (listenerArg.type) {
          case AST_NODE_TYPES.Identifier:
            // `listener` is a function reference
            context.report({
              node: listenerArg,
              messageId: "issue:missingEventParameter",
            });
            break;

          case AST_NODE_TYPES.ArrowFunctionExpression:
          case AST_NODE_TYPES.FunctionExpression: {
            if (listenerArg.params.length > 0)
              return;

            const codeFixer = (fixer: TSESLint.RuleFixer): TSESLint.RuleFix => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              const openingParentheses = context.sourceCode.getFirstToken(listenerArg, {
                filter: token => token.value === "("
              }) !;
              return fixer.insertTextAfter(openingParentheses, "_event");
            };
            context.report({
              node: listenerArg,
              messageId: "issue:missingEventParameter",
              fix: codeFixer,
              suggest: [{
                messageId: "fix:addEventParameter",
                fix: codeFixer
              }]
            });

            break;
          }
        }
      },
    };
  }
});
