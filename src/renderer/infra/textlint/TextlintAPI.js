// MIT © 2017 azu
"use strict";
const ipcPromise = require("ipc-promise");
import Key from "../../../node/ipc/textlint-ipc-key";
export default class TextlintAPI {
    /**
     * @param {string} configFile path to config file
     * @param {string} rulesBaseDirectory path to directory of node_modules
     */
    constructor({
        configFile,
        rulesBaseDirectory
    }) {
        ipcPromise.send(Key.setup, {
            configFile,
            rulesBaseDirectory
        });
    }

    /**
     * @param {string} text
     * @param {string} [ext]
     * @returns {Promise.<TextLintMessage[]>}}
     */
    lintText(text, ext = ".md") {
        return ipcPromise.send(Key.lintText, {text, ext}).then(messages => {
            console.log(messages);
            return messages;
        });
    }

    /**
     * @param {string} text
     * @param {string} [ext]
     * @returns {Promise.<TextLintFixResult>}}
     */
    fixText(text, ext = ".md") {
        return ipcPromise.send(Key.fixText, {text, ext}).then(results => {
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
