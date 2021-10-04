# Guild Prettier Config

At Guid, we uses [`prettier`](https://prettier.io/) to format our code javascript and typescript code in a standard way.

## Install

```bash
yarn add -D @guildeducationinc/prettier-config
```

## Usage

Make sure that you have prettier installed in your project. To learn how to do this, refer to [prettier docs](https://prettier.io/docs/en/install.html).

### Configure via package.json

To use the Guild prettier config, simply add the following to your `package.json`.

```diff
{
  "name": "my-project-name",
  ...
+ "prettier": "@guildeducationinc/prettier-config"
}
```

### Configure via config file

Or, add a `prettier.config.js` file in the root of your project with the following:

```
  module.exports = {
    ...require('@guildeducationinc/prettier-config'),
  };
```

### Run Prettier

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
+   "prettier:format": "prettier --write \"src/**/*.{ts,tsx,js,jsx}\"",
+   "prettier:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx}\"",
    ...
  }
}
```

These commands allow you to both format and check your code using yarn commands.
## Deployment Integration

We view formatting as a part of the CI process for any new PR. Builds should fail if code is not formatted correctly. This section will walk you through how to integrate your new prettier commands with your deployment processes.

### Setting up Github Actions

Prettier checks can be added to any action workflow by adding the following job:
```diff
# some-workflow.yml
name: Your workflow
...
jobs:
   some-other-job:
...
+  prettier-check:
+    name: Prettier Check
+    runs-on: ubuntu-latest
+    steps:
+      - uses: actions/checkout@v2
+      - uses: actions/setup-node@v2
+        with:
+          node-version: '16'
+      - run: yarn install
+      - run: yarn prettier:check
```

Additionally, you can integrate the prettier check into any pre-existing job by adding the following step after the job has checked out and installed your project:

```diff
jobs:
  build-test:
    name: Build and Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: yarn install
+     - run: yarn prettier:check
      - run: yarn test
      - run: yarn build
```

### Setting up Circleci

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

### Configure lint-staged
```bash
yarn add -D lint-staged
```

Then, add to your `package.json`

```diff
# package.json
{
  "name": "my-project-name",
  ...
+ "lint-staged": {
+   "src/**/*.{js,jsx,ts,tsx}": [
+     "yarn prettier:format"
+   ]
+ }
}
```

### Configure Husky

Follow the initial installation instructions to add Husky to your project documented [here](https://typicode.github.io/husky/#/?id=manual).

#### Create a new pre-commit hook

Once Husky is installed run the following command to configure your pre-commit hook:
```zsh
yarn husky add .husky/pre-commit "yarn lint-staged"
```

#### Modify an existing pre-commit hook
If you already have a pre-commit hook just add the following line to your existing hook:

```diff
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

...

+ yarn lint-staged
```

### FAQ

> My files are being linted, but the changes aren't being committed?

You are likely using an older version of `lint-staged`. As of v10 `lint-staged` will [automatically add your files for you](https://github.com/okonet/lint-staged/issues/775#issuecomment-577106594), but previous versions required you to manually add them as part of your file actions. 

The recommended solution is to upgrade your version of `lint-staged` to be above v10. 

If you are unable to upgrade to a current version of `lint-staged` you can alternatively manually add the command to your action as follows:
```diff
#package.json
{
  "name": "my-project-name",
  ...
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": [
      "yarn prettier:format",
+     "git add"
    ]
  }
}
```

> I defined my hooks in the package.json and they aren't running?

As of v5.0 Husky no longer supports configuring its hooks as they were done in earlier versions. You will need to upgrade your configuration as documented [here](https://typicode.github.io/husky/#/?id=migrate-from-v4-to-v7).

> My hooks aren't running automatically for some of our developers?

As of v5.0 Husky no longer autoinstalls its hooks. You can configure your repo to autoinstall the hooks as documented [here](https://typicode.github.io/husky/#/?id=install) or have your developers run `husky install` to configure them locally.

> How do I ignore files?

To ignore files, add a `.prettierignore` to the root of your project and add any glob patterns of files you'd like for prettier to ignore. For detailed configuration instructions please see the prettier docs [here](https://prettier.io/docs/en/ignore.html).
