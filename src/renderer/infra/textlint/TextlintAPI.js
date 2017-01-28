// MIT © 2017 azu
"use strict";
const remote = require("electron").remote;
const textlint = remote.require("textlint");
export default class TextlintAPI {
    /**
     * @param {string} configFile path to config file
     * @param {string} rulesBaseDirectory path to directory of node_modules
     */
    constructor({
        configFile,
        rulesBaseDirectory
    }) {
        this.configFile = configFile;
        this.rulesBaseDirectory = rulesBaseDirectory;

        /**
         * @type {TextLintEngine}
         * @private
         */
        this._textLintEngine = null;
        /**
         * @type {TextFixEngine}
         * @private
         */
        this._textFixEngine = null;
    }

    get lintEngine() {
        if (this._textLintEngine) {
            return this._textLintEngine;
        }
        const textLineEngine = new textlint.TextLintEngine({
            configFile: this.configFile,
            rulesBaseDirectory: this.rulesBaseDirectory
        });
        this._textLintEngine = textLineEngine;
        return textLineEngine;
    }


    get fixEngine() {
        if (this._textFixEngine) {
            return this._textFixEngine;
        }
        const textFixEngine = new textlint.TextFixEngine({
            configFile: this.configFile,
            rulesBaseDirectory: this.rulesBaseDirectory
        });
        this._textFixEngine = textFixEngine;
        return textFixEngine;
    }

    /**
     * @param {string} text
     * @param {string} [ext]
     * @returns {Promise.<TextLintMessage[]>}}
     */
    lintText(text, ext = ".md") {
        return this.lintEngine.executeOnText(text, ext).then(results => {
            return this._flattenResultToMessages(results);
        });
    }

    /**
     * @param {string} text
     * @param {string} [ext]
     * @returns {Promise.<TextLintFixResult>}}
     */
    fixText(text, ext = ".md") {
        return this.fixEngine.executeOnText(text, ext).then(results => {
            return results[0];
        });
    }

    _flattenResultToMessages(results) {
        const lintMessages = [];
        results.forEach(result => {
            result.messages.forEach(message => {
                lintMessages.push(message);
            });
        });
        return lintMessages;
    }
}