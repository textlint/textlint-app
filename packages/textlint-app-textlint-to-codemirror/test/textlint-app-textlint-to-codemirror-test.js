// MIT © 2017 azu
"use strict";
const assert = require("assert");
const path = require("path");
const createValidator = require("../lib/textlint-app-textlint-to-codemirror");
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
