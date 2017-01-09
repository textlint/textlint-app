// MIT © 2017 azu
"use strict";
const {TextLintEngine} = require("textlint");
const path = require("path");
const convertMessageToCodeMirror = require("textlint-message-to-codemirror");
/**
 * create Validator for CodeMirror lint
 * @param {string} textlintrcFilePath
 * @param {string} nodeModulesDirectory
 * @returns {function(text: string, ext:string)}
 */
module.exports = function createValidator({textlintrcFilePath, nodeModulesDirectory}) {
    const engine = new TextLintEngine({
        configFile: path.normalize(textlintrcFilePath),
        rulesBaseDirectory: path.normalize(nodeModulesDirectory)
    });
    return function textlintValidator(text, ext = ".md") {
        return engine.executeOnText(text, ext).then(results => {
            const codeMirrorResults = [];
            results.forEach(result => {
                result.messages.forEach(message => {
                    codeMirrorResults.push(convertMessageToCodeMirror(message));
                });
            });
            return codeMirrorResults;
        });
    };
};