// MIT © 2017 azu
"use strict";
import TextlintAppId from "./TextlintAppId";
import TextlintEditor from "./textlint-editor/TextlintEditor";
import Workspaces from "./workspace/Workspaces";
export default class TextlintApp {

    /**
     * @type {TextlintAppId}
     */
    id;

    /**
     * @param {TextlintEditor} textlintEditor
     * @param {Workspaces} workspaces
     */
    constructor({workspaces, textlintEditor}) {
        this.id = new TextlintAppId();
        this.workspaces = workspaces;
        this.textlintEditor = textlintEditor;
    }
}
