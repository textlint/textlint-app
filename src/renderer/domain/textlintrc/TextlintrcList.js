// MIT © 2017 azu
"use strict";
import Textlintrc from "./Textlintrc";
import EmptyTextlintrc from "./EmptyTextlintrc";
export default class TextlintrcList {
    /**
     * @type {Textlintrc}
     * @private
     */
    _current;

    /**
     * @type {Textlintrc[]}
     * @private
     */
    _list;

    /**
     * @param {Textlintrc} [defaultTextlintrc]
     */
    constructor(defaultTextlintrc = new EmptyTextlintrc()) {
        this._current = defaultTextlintrc;
    }

    /**
     * @returns {Textlintrc}
     */
    get current() {
        return this._current;
    }

    /**
     * update current content
     * @param {string} content
     */
    updateCurrentContent(content) {
        this._current = this._current.updateContent(content);
    }

    openNewTextlintrc({content, filePath}) {
        const alreadyOpened = this._list.some(textlintrc => textlintrc.filePath === filePath);
        if (alreadyOpened) {
            return;
        }
        this._current = new Textlintrc({content, filePath});
        this._list.push(this._current);
    }
}