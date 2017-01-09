// MIT © 2017 azu
"use strict";
import TextlintApp from "./TextlintApp"
import Workspaces from "./workspace/Workspaces"
import WorkspaceFactory from "./workspace/WorkspaceFactory"
export default class TextlintAppFactor {
    /**
     * @param {string} directory - default workspace directory
     * @returns {TextlintApp}
     */
    static create(directory) {
        const workspace = WorkspaceFactory.create({
            directory
        });
        const workspaces = new Workspaces(workspace);
        return new TextlintApp(workspaces);
    }
}