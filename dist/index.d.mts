declare const _default: {
  meta: {
    name: string;
    version: string;
  };
  rules: {
    "prefix-inc-dec-operators": import("@typescript-eslint/utils/ts-eslint").RuleModule<"fix:postfixIncrement" | "fix:postfixDecrement" | "issue:postfixIncrement" | "issue:postfixDecrement", readonly unknown[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
    "require-event-parameter": import("@typescript-eslint/utils/ts-eslint").RuleModule<"fix:addEventParameter" | "issue:missingEventParameter", readonly unknown[], unknown, import("@typescript-eslint/utils/ts-eslint").RuleListener>;
  };
};
export { _default as default };