// MIT © 2017 azu
"use strict";
const assert = require("assert");
const textlintToCodeMirror = require("../lib/textlint-message-to-codemirror");
describe("textlintToCodeMirror", () => {
    /*
export class TextLintMessage {
    // See src/shared/type/MessageType.js
    // Message Type
    type: string;
    // Rule Id
    ruleId: string;
    message: string;
    // optional data
    data?: any;
    // FixCommand
    fix?: TextLintFixCommand;
    // location info
    // Text -> AST TxtNode(0-based columns) -> textlint -> TextLintMessage(**1-based columns**)
    line: number; // start with 1
    column: number;// start with 1
    // indexed-location
    index: number;// start with 0
    // Severity Level
    // See src/shared/type/SeverityLevel.js
    severity?: number;
}
*/
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
    it("null and throw error", () => {
        assert.throws(() => {
            textlintToCodeMirror(null)
        }, Error);
    });
});
