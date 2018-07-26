# textlint-app [![Build Status](https://travis-ci.org/textlint/textlint-app.svg?branch=master)](https://travis-ci.org/textlint/textlint-app) [![Build status](https://ci.appveyor.com/api/projects/status/mnburjdwu7vsva7t?svg=true)](https://ci.appveyor.com/project/azu/textlint-app)

[textlint](https://github.com/textlint/textlint "textlint") app for cross platform.

![gif](https://media.giphy.com/media/3o7buj7KnuEurvGVm8/giphy.gif)

## Why?

- Not require Node.js/npm on your environment.
- Just download binary and launch app.

## Install

Download Binary from <https://github.com/textlint/textlint-app/releases/latest>

## Features

- No dependencies
    - Just install and run it
- Cross platform
    - Windows/Linux/Mac - [Download it](https://github.com/textlint/textlint-app/releases/latest)
- Support `.textlintrc`
    - You can use existing `.textlintrc` config
- Support `--fix`
    - Automatically fix lint error
- TODO:
    - [ ] Support only markdown <https://github.com/textlint/textlint-app/issues/8>
    - [ ] Improve performance <https://github.com/textlint/textlint-app/issues/9>
 
## Usage

1. Open textlint app
2. Go to "Setting" tab
3. Setup `.textlintrc`
    - Please see [Configuring textlint](https://github.com/textlint/textlint/blob/master/docs/configuring.md "Configuring textlint")
4. Press "Install"!
5. Edit with textlint

### Example

`.textlintrc`:
```json
{
  "rules": {
    "no-todo": true
  }
}
```

Result:

![image](https://monosnap.com/file/YdUoiwRYVDEghLw6k86t7sQzNHb2G3.png)


## Development

You can install textlint-app in local environment.

    yarn install
    yarn run bootstrap
    yarn run watch
    yarn run electron

### Update packages

If you update packages/ modules

    yarn run publish
    # It bump version, not publish to npm
    
Update packages/ dependencies

    yarn upgrade

TODO: `file:` is not linked by lerna... We will improve this.

## Changelog

See [Releases page](https://github.com/textlint/textlint-app/releases).

## Running tests

Install devDependencies and Run `yarn test`:

    yarn test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/textlint-app/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
