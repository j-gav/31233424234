## Hacker News v3

 - This project is developed using Vue 3 which is being bundled using Vite for high performance, I am using the [Vuetify](https://vuetifyjs.com/en/) component framework for the UI, this offers some nice features for handling infinite scroll which I am using as an alternative form of pagination for articles within the application. For unit tests I am using Vitest which is the recommended framework for testing Vue 3 applications. For e2e tests I am using Playwright, for linting I am using ESLint with the recommended settings for modern JS and Vue 3. For formatting I am using Prettier which is using the projects .editorconfig file. I am also using cspell to perform spellchecks on the repo. There are also a number of GitHub actions that are being run on pull requests.
 - Developed by John Gavin, December 2024
 - Deployed to xxxxxxxxx.com
 
### Running the project locally

 - Requires NodeJS v18+
 - Install packages `npm i`
 - Run dev task `npm run dev`
 - Open [localhost](http://localhost:3000/)

### Building the project
- Run `npm run build`
- Output is visible in the `dist` directory

### Recommended dev tools
- Vscode with plugins (Vue - Official, Vitest, Prettier, ESLint, EditorConfig, Cspell)

### Running unit tests
- Run `npm run test`
- Coverage is visible in the `coverage` directory

### Running e2e tests (TODO)
- add description around Playwright

### Running linter (TODO)
- add description around eslint

### Running spellcheck (TODO)
- add description around cspell

### Contributing (TODO)
- Open a PR to the master branch
- Populate the checklist provided
- All GitHub checks will then run, e.g. tests, linter and spellcheck
- PRs must pass all checks