// MIT © 2017 azu
"use strict";
import { Store } from "almin";
export class TextlintEditorState {
    /**
     * @param {string} textContent
     * @param {string|null} contentFilePath
     * @param {string|null} contentFileExtension
     */
    constructor({
                    textContent,
                    contentFilePath,
                    contentFileExtension
                }) {
        this.textContent = textContent;
        this.contentFilePath = contentFilePath;
        this.contentFileExtension = contentFileExtension;
    }

    /**
     *
     * @param {TextlintApp} textlintApp
     * @returns {TextlintEditorState}
     */
    update({ textlintApp }) {
        /**
         * @type {TextlintEditor}
         */
        const textlintEditor = textlintApp.textlintEditor;
        return new TextlintEditorState(Object.assign({}, this, {
            textContent: textlintEditor.content.text,
            contentFilePath: textlintEditor.content.filePath,
            contentFileExtension: textlintEditor.content.fileExtension
        }));
    }

}
export default class TextlintEditorStore extends Store {
    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({ textlintAppRepository }) {
        super();
        /**
         * @type {TextlintEditorState}
         */
        this.state = new TextlintEditorState({
            textContent: "",
            contentFilePath: null,
            contentFileExtension: null
        });
        textlintAppRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return this.state;
    }

    _onChange(textlintApp) {
        this.setState(this.state.update({ textlintApp }));
    }
}
