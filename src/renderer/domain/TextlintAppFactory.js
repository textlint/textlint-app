// MIT © 2017 azu
"use strict";
import TextlintApp from "./TextlintApp";
import TextlintEditor from "./textlint-editor/TextlintEditor";
import TextlintEditorContentNoFile from "./textlint-editor/TextlintEditorContentNoFile";
import Workspaces from "./workspace/Workspaces";
import WorkspaceFactory from "./workspace/WorkspaceFactory";
export default class TextlintAppFactor {
    /**
     * @param {string} directory - default workspace directory
     * @param {Textlintrc} [textlintrc] - default textlintrc
     * @returns {TextlintApp}
     */
    static create({directory, textlintrc}) {
        const workspace = WorkspaceFactory.create({
            directory,
            textlintrc
        });
        const workspaces = new Workspaces(workspace);
        const usage = "";
        const textlintEditor = new TextlintEditor(new TextlintEditorContentNoFile({
            text: usage
        }));
        return new TextlintApp({workspaces, textlintEditor});
    }
}
