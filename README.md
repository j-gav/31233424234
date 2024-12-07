## Hacker News v3

 This project is developed as a mobile first site using Vue 3 which is being bundled using Vite for high performance, I am using the [Vuetify](https://vuetifyjs.com/en/) component framework for the UI, this offers some nice features for handling infinite scroll which I am using as an alternative form of pagination for articles within the application. For unit tests I am using Vitest which is the recommended framework for testing Vue 3 applications. For e2e tests I am using Playwright, for linting I am using ESLint with the recommended settings for modern JS and Vue 3. For formatting I am using Prettier and I am using cspell to perform spellchecks on the repo. There are also a number of GitHub actions that are being run on pull requests.

 - Deployed to [https://j-gav.github.io/31233424234/](j-gav.github.io/31233424234)
 
### Running the project locally

 - Requires NodeJS v18+
 - Install packages `npm i`
 - Run dev task `npm run dev`
 - Open [http://localhost:3000/31233424234/](localhost)

### Building the project
- Run `npm run build`
- Output is visible in the `dist` directory

### Deploying the project
- Run `npm run deploy`
- Uses [https://www.npmjs.com/package/gh-pages](gh-pages) which deploys dist code to a new branch hosted on GitHub pages 

### Recommended dev tools
- Vscode with plugins (Vue - Official, Vitest, Prettier, ESLint, EditorConfig, Cspell)

### Running unit tests
- Run `npm run test`
- Coverage is visible in the `coverage` directory

### Running e2e tests
- Install Playwright `npx playwright install`
- Run `npm run test:e2e`
- Results will appear in console, report can be viewed after by running `npx playwright show-report`

### Running linter
- Run `npm run lint`
- Results will appear in console

### Running spellcheck
- Run `npm run spellcheck`
- Results will appear in console

### Contributing
- Open a PR to the main branch
- Populate the checklist provided
- All GitHub checks will then run, e.g. tests, linter and spellcheck
- PRs must pass all checks to be considered for merge