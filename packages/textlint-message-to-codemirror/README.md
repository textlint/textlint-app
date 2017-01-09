# textlint-message-to-codemirror

Convert textlint'Ss messages to CodeMirror lint object

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-message-to-codemirror

## Usage

```js
const assert = require("assert");
const textlintToCodeMirror = require("textlint-message-to-codemirror");
describe("textlintToCodeMirror", () => {
    it("message to codemirror", () => {
        assert.deepEqual(textlintToCodeMirror({
            message: "message",
            severity: 1,
            line: 1,
            column: 1
        }), {
            from: {
                ch: 0,
                line: 0
            },
            to: {
                ch: 1,
                line: 0
            },
            message: "message",
            severity: "warning"
        });

        assert.deepEqual(textlintToCodeMirror({
            message: "message",
            severity: 2,
            line: 10,
            column: 10
        }), {
            from: {
                ch: 9,
                line: 9
            },
            to: {
                ch: 10,
                line: 9
            },
            message: "message",
            severity: "error"
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
