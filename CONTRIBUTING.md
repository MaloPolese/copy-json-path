# 🚩 Contributing guide

## 🚀 Setup your developer environment

### Dependencies

- [nodejs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

### Usage

- Clone the repository
  ```bash
  git clone https://github.com/MaloPolese/copy-json-path.git
  cd copy-json-path
  ```
- Run the following command in the root directory of the project to install dependencies:
  ```bash
  npm install
  ```
- Run extension:
  Go to the `Run and Debug` (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>) tab in VSCode

  ![run extension tab](assets/run-extension-tab.png 'run-extension-tab')

  And click on the `Run Extension` button.

  ![run extension button](assets/run-extension-btn.png 'run-extension-btn')

### Tests

- Run the following command in the root directory of the project to run tests:

```bash
npm run test
```

## 🗃️ Workflow

### Submit an issue

We want to follow a simple and easy way to submit issues or pull requests.
If you want to report a bug or submit a feature request, please use the templates provided.

_Using our templates for issues and bug report, labels should be automatically provided._

### Open a Pull Request

Once you chose an issue that you want to work on, consider using templates provided and fill it.
When a precise description has been filled in you can start to open your draft Pull Request.

### Commits conventions

Our commit convention follow the [Conventional Commits 1.0.0-beta.4](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

### Sign commit message

Please consider signing the commit message at least with `Signed-Off-By`. This is a way to certify that you wrote the code or otherwise have the right to pass it on as an open-source patch. The process is simple: if you can certify the [Developer's Certificate of Origin](https://developercertificate.org/) (DCO), then just add a line to every git commit message:

### Commit hooks

This repository uses [husky](https://typicode.github.io/husky/) for commit hooks.
For each commit, the following checks are performed:

- Lint
- Format
- Tests
- Commit message convention check
