# eslint-plugin-qbt-webui

A collection of custom ESLint rules for qBittorrent WebUI.

## Installation

1. Add the plugin
```shell
npm install --save-dev https://github.com/Chocobo1/eslint-plugin-qbt-webui/tarball/v1
```

2. Load the rules
```js
// eslint.config.mjs

import PluginQbtWebUI from "eslint-plugin-qbt-webui";

export default [{
  plugins: {
    PluginQbtWebUI
  },
  rules: {
    // find the list of rules in `lib/rules/index.ts`
    "PluginQbtWebUI/prefix-inc-dec-operators": "error"
  }
}];
```

3. Done!
