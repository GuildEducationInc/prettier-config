# Guild Prettier Config

At Guid, we uses [`prettier`](https://prettier.io/) to format our code javascript and typescript code in a standard way.

## Install

```bash
yarn add -D @guildeducationinc/prettier-config
```
## Usage

Make sure that you have prettier installed in your project. To learn how to do this, refer to [prettier docs](https://prettier.io/docs/en/install.html).

To use the Guild prettier config, simply add the following to your `package.json`.

```diff
{
  "name": "my-project-name",
  ...
+ "prettier": "@guildeducationinc/prettier-config"
}
```

Next, run 
```bash
yarn prettier  --write "src/**/*.{ts,tsx,js,jsx}"
```

If you've just installed prettier, this runs prettier against the entire code base and formats it to match our standard config.


## Optional: Add pre-commit hook
While optional, it's highly recommended to add a pre-commit hook so that prettier runs on all commits. This automates prettier and prevents any files from becoming out of sync with our formatting.

```bash
yarn add -D husky
yarn add -D lint-staged
```

Then, add to your `package.json`
```diff
{
  "name": "my-project-name",
  ...
+ "husky": {
+    "hooks": {
+     "pre-commit": "lint-staged"
+   }
+ },
+ "lint-staged": {
+   "src/**/*.{js,jsx,ts,tsx}": [
+     "prettier --write src/**/*.{js,jsx,ts,tsx}",
+     "git add"
+   ]
+ }
}
```