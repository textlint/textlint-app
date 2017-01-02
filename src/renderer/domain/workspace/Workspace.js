// MIT © 2017 azu
"use strict";
import Textlintrc from "./textlintrc/Textlintrc"
export default class Workspace {
    /**
     * @type {Textlintrc}
     */
    textlintrc;

    /**
     * @param {Textlintrc} textlintrc
     */
    constructor({textlintrc}) {
        this.textlintrc = textlintrc;
    }

    /**
     * @param {string} filePath
     * @param {string} content
     */
    openNewTextlintrc({filePath, content}) {
        this.textlintrc = new Textlintrc({filePath, content});
    }

    /**
     * update current content
     * @param {string} content
     */
    updateCurrentContent(content) {
        this.textlintrc = this.textlintrc.updateContent(content);
    }

    /**
     * @param {Workspace} workspace
     * @returns {Boolean}
     */
    equals(workspace) {
        return workspace.textlintrc.equals(this.textlintrc);
    }
}