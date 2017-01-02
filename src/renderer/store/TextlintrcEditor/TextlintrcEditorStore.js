// MIT © 2017 azu
"use strict";
import {ReduceStore, ReduceState} from "almin-reduce-store";
export class TextlintrcEditorState extends ReduceState {
    /**
     * @param {Textlintrc} [textlintrc]
     */
    constructor({
        textlintrc = {}
    } = {}) {
        super();
        this.textlintrc = textlintrc;
        this.isValid = textlintrc.isValid;
        this.textValue = textlintrc.textValue;
        this.jsonValue = textlintrc.jsonValue;
        this.packageNames = textlintrc.packageNames;
        this.canAccessToFile = textlintrc.canAccessToFile;
        this.filePath = textlintrc.filePath;
    }

    update({textlintrc}) {
        return new TextlintrcEditorState(Object.assign({}, this, {textlintrc}));
    }

    reduce(payload) {
        return this;
    }
}
export default class TextlintrcEditorStore extends ReduceStore {
    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({textlintAppRepository}) {
        super();
        this.state = new TextlintrcEditorState();
        textlintAppRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return {
            textlintrcEditor: this.state
        };
    }

    _onChange(textlintApp) {
        this.setState(this.state.update({textlintApp}));
    }
}