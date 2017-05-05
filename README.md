# textlint-app [![Build Status](https://travis-ci.org/textlint/textlint-app.svg?branch=master)](https://travis-ci.org/textlint/textlint-app) [![Build status](https://ci.appveyor.com/api/projects/status/mnburjdwu7vsva7t?svg=true)](https://ci.appveyor.com/project/azu/textlint-app)

textlint app for cross platform.

## Why?

- Not require Node.js/npm on your enviroment.
- Just download binary and launch app.

## Install

Download Binary from <https://github.com/textlint/textlint-app/releases>

## Development

You can install textlint-app in local enviroment.

    npm install
    npm run bootstrap
    npm run watch
    npm run electron

### Update packages

If you update packages/ modules

    yar run publish
    # It bump version, not publish to npm
    
Update packages/ dependencies

    yarn upgrade

TODO: `file:` is not linked by lerna... We will improve this.

## Changelog

See [Releases page](https://github.com/textlint/textlint-app/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

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
