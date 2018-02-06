# Roll for Guild: Character Generator

[![rollforguild.com build status on CircleCI][circleci-badge]][circleci]
[![rollforguild.com dependencies on David DM][daviddm-badge]][daviddm]
[![rollforguild.com climate on Code Climate][codeclimate-badge]][codeclimate]

[![Code of Conduct][code-of-conduct-badge]][code-of-conduct]
[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

## Setting up

1. Grab the repo
```bash
git clone https://github.com/RollForGuild/rollforguild.com.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the server
```bash
npm run dev
# or
yarn run dev
```

### Some things you'll need

#### Environment Variables

| Name                             | Purpose |
|----------------------------------|---------|
| `RFG_API_URL`                    | This is the URL the application will proxy API requests to |
| `RFG_APP_PORT`                   | This is the port to run the application on |
| `RFG_GOOGLE_MAPS_API_KEY`        | This is the API key for Google Maps |
| `RFG_GOOGLE_TAG_MANAGER_API_KEY` | This is the ID for Google Tag Manager |

### Debugging

#### VS Code

1. Install the [Debugger for Chrome](https://github.com/Microsoft/vscode-chrome-debug) extension for VS Code
1. Set all of your environment variables in a `.env` file at the root of the project
1. Open the Debug tab and run the `RFG: Full` program

### Code Style

#### ESLint

We have ESLint setup to error if our code styles aren't adhered to. Feel free to PR changes to the ESLint file, but make sure the do so as an individual PR. Changes to ESLint that are included with other changes will not be approved.

#### Commits

Commits to this project should use the [Angule commit conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153). We'll be adding a listing of allowed scopes in the future.





[code-of-conduct]: CODE_OF_CONDUCT.md
[code-of-conduct-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[codeclimate]: https://codeclimate.com/github/RollForGuild/rollforguild.com
[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability/RollForGuild/rollforguild.com.svg?style=flat-square
[coveralls]: https://coveralls.io/github/RollForGuild/rollforguild.com
[coveralls-badge]: https://img.shields.io/coveralls/RollForGuild/rollforguild.com.svg?style=flat-square
[daviddm]: https://david-dm.org/RollForGuild/rollforguild.com
[daviddm-badge]: https://img.shields.io/david/RollForGuild/rollforguild.com.svg?style=flat-square
[github-watch]: https://github.com/RollForGuild/rollforguild.com/watchers
[github-watch-badge]: https://img.shields.io/github/watchers/RollForGuild/rollforguild.com.svg?style=social
[github-star]: https://github.com/RollForGuild/rollforguild.com/stargazers
[github-star-badge]: https://img.shields.io/github/stars/RollForGuild/rollforguild.com.svg?style=social
[prs]: CONTRIBUTING.md
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[circleci]: https://circleci.com/gh/RollForGuild/rollforguild.com
[circleci-badge]: https://img.shields.io/circleci/project/github/RollForGuild/rollforguild.com.svg?style=flat-square
