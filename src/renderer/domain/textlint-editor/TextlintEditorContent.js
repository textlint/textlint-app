// MIT © 2017 azu
"use strict";
const path = require("path");
export default class TextlintEditorContent {
    /**
     *
     * @param {string} text
     * @param {string} filePath
     */
    constructor({ text, filePath }) {
        this.text = text;
        this.filePath = filePath;
    }

    get canAccessToFile() {
        return true;
    }

    get fileExtension() {
        return path.extname(this.filePath);
    }

    /**
     * @param {string} text
     * @returns {TextlintEditorContent}
     */
    updateText(text) {
        return new this.constructor(Object.assign({}, this, { text }));
    }
}
