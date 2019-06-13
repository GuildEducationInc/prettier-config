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

## Adding commands to `package.json`
To make it easier to manage prettier formatting, it's highly recommended to add the following scrips to your projects `package.json`

```diff
# package.json
{
  ...
  "scripts": {
    ...
+   "prettier:format": "prettier --write "src/**/*.{ts,tsx,js,jsx}",
+   "prettier:check": "prettier --check "src/**/*.{ts,tsx,js,jsx}",
    ...
  }
}
```

These commands allow you to both format and check your code using yarn commands.
## Setting up Circleci

We view formatting as a part of the CI process for any new PR. Builds should fail if code is not formatted correctly.

In the projects `config.yml`, add the following to your jobs:
```diff
# config.yml
...
jobs:
+ prettier:
+    - run:
+       name: Prettier Check
+       command: yarn prettier:check
...
```
Add this job to your workflow if the projects uses them.

## Optional (__Highly Recommended__): Add pre-commit hook

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

Or, add a `prettier.config.js` file in the root of your project with the following

```
  module.exports = {
    ...require('@guildeducationinc/prettier-config'),
  };
```

### FAQ

#### Ignoring files

To ignore files, add a `.prettierignore` to the root of your project and add any glob patterns of files you'd like for prettier to ignore.
