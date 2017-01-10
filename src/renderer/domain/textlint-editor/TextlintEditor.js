// MIT © 2017 azu
"use strict";
import TextlintEditorContent from "./TextlintEditorContent";
export default class TextlintEditor {
    /**
     * @param {TextlintEditorContent} content
     */
    constructor(content) {
        this.content = content;
    }

    /**
     * @param {string} text
     * @param {string} filePath
     */
    openNewFile({text, filePath}) {
        this.content = new TextlintEditorContent({text, filePath});
    }

    /**
     * @param {string} text
     */
    updateText(text) {
        this.content = this.content.updateText(text);
    }
}