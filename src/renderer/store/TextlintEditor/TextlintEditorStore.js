// MIT © 2017 azu
"use strict";
import {ReduceStore, ReduceState} from "almin-reduce-store";
export class TextlintEditorState extends ReduceState {
    /**
     * @param {TextlintEditor} [textlintEditor]
     */
    constructor({
        textlintEditor = {
            content: {}
        }
    } = {}) {
        super();
        this.textlintEditor = textlintEditor;
        this.textContent = textlintEditor.content.text;
        this.contentFilePath = textlintEditor.content.filePath;
        this.contentFileExtenstion = textlintEditor.content.fileExtension;
    }

    /**
     *
     * @param {TextlintApp} textlintApp
     * @returns {TextlintEditorState}
     */
    update({textlintApp}) {
        const textlintEditor = textlintApp.textlintEditor;
        return new TextlintEditorState(Object.assign({}, this, {
            textlintEditor
        }));
    }

}
export default class TextlintEditorStore extends ReduceStore {
    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({textlintAppRepository}) {
        super();
        this.state = new TextlintEditorState();
        textlintAppRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return {
            textlintEditor: this.state
        };
    }

    _onChange(textlintApp) {
        this.setState(this.state.update({textlintApp}));
    }
}
