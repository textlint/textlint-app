# textlint-app-textlint-to-codemirror

Convert textlint'Ss messages to CodeMirror lint object

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-app-textlint-to-codemirror

## Usage

```js
// MIT © 2017 azu
"use strict";
const assert = require("assert");
const path = require("path");
const createValidator = require("textlint-app-textlint-to-codemirror");
describe("textlint-app-textlint-to-codemirror", () => {
    it("lint and return codemirror result", () => {
        const validate = createValidator({
            textlintrcFilePath: path.join(__dirname, "fixtures", ".textlintrc"),
            nodeModulesDirectory: path.join(__dirname, "..", "node_modules")
        });
        return validate("- [ ] text", ".md").then(result => {
            assert.deepEqual(result, [
                {
                    from: {
                        ch: 2,
                        line: 0
                    },
                    to: {
                        ch: 3,
                        line: 0
                    },
                    message: "Found TODO: '- [ ] text'",
                    severity: "error"
                }
            ]);
        });
    });
});

```

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing


Pull requests and stars are always welcome.
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
