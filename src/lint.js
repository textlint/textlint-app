// MIT © 2017 azu
"use strict";
const {TextLintEngine} = require("textlint");
const path = require("path");
module.exports = function createValidator({textlintrcFilePath, nodeModulesDirectory}) {
    const engine = new TextLintEngine({
        configFile: path.normalize(textlintrcFilePath),
        rulesBaseDirectory: path.normalize(nodeModulesDirectory)
    });
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

    return function textlintValidator(text, ext = ".md") {
        return engine.executeOnText(text, ext).then(results => {
            const codeMirrorResults = [];
            results.forEach(result => {
                result.messages.forEach(message => {
                    // https://codemirror.net/doc/manual.html
                    // the API uses objects with line and ch properties. Both are zero-based.
                    const posFrom = {line: message.line - 1, ch: message.column - 1};
                    const posTo = {line: message.line - 1, ch: message.column};
                    codeMirrorResults.push({
                        from: posFrom,
                        to: posTo,
                        message: message.message,
                        severity: convertSeverity(message.severity)
                    });
                });
            });
            return codeMirrorResults;
        });
    };
};