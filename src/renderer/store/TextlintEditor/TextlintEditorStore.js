// MIT © 2017 azu
"use strict";
import * as path from "path";
import { Store } from "almin";
export class TextlintEditorState {
    /**
     * @param {string} textContent
     * @param {string|null} contentFilePath
     * @param {string|null} contentFileExtension
     * @param {boolean} canAccessToFile
     */
    constructor({
                    textContent,
                    contentFilePath,
                    contentFileExtension,
                    canAccessToFile
                }) {
        this.textContent = textContent;
        this.contentFilePath = contentFilePath;
        this.contentFileExtension = contentFileExtension;
        this.canAccessToFile = canAccessToFile;
    }

    get editingFileName() {
        if (!this.canAccessToFile) {
            return "";
        }
        if (this.contentFilePath.length <= 100) {
            return this.contentFilePath;
        }
        return path.basename(this.contentFilePath);
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
            contentFileExtension: textlintEditor.content.fileExtension,
            canAccessToFile: textlintEditor.content.canAccessToFile
        }));
    }
}

/**
 * default state
 * @type {TextlintEditorState}
 */
export const defaultState = new TextlintEditorState({
    textContent: "",
    contentFilePath: null,
    contentFileExtension: null,
    canAccessToFile: false
});

export default class TextlintEditorStore extends Store {
    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({ textlintAppRepository }) {
        super();
        /**
         * @type {TextlintEditorState}
         */
        this.state = defaultState;
        textlintAppRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return this.state;
    }

    _onChange(textlintApp) {
        this.setState(this.state.update({ textlintApp }));
    }
}
