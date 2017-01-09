// MIT © 2017 azu
"use strict";
var assert = require("assert");
function convertSeverity(severity) {
    switch (severity) {
        case 1:
            return "warning";
        case 2:
            return "error";
        default:
            return "error";
    }
}
/**
 * Convert TextlintMessage to CodeMirror lint result object
 * @param {TextLintMessage} message
 * @returns {{from: {line: number, ch: number}, to: {line: number, ch: *}, message: *, severity: *}}
 */
module.exports = function convertTextlintMessageToCodeMirror(message) {
    assert(typeof message === "object", "messsage should be textlint message object");
    // https://codemirror.net/doc/manual.html
    // the API uses objects with line and ch properties. Both are zero-based.
    const posFrom = {line: message.line - 1, ch: message.column - 1};
    const posTo = {line: message.line - 1, ch: message.column};
    return {
        from: posFrom,
        to: posTo,
        message: message.message,
        severity: convertSeverity(message.severity)
    }
};