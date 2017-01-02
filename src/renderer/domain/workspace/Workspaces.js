// MIT © 2017 azu
"use strict";
import Textlintrc from "./textlintrc/Textlintrc";
import EmptyTextlintrc from "./textlintrc/EmptyTextlintrc";
import Workspace from "./Workspace";
export default class Workspaces {
    /**
     * @type {Workspace[]}
     * @private
     */
    _workspaces;

    /**
     * @type {Workspace}
     * @private
     */
    _current;

    constructor() {
        this._current = new Workspace({
            textlintrc: new EmptyTextlintrc()
        });
    }

    /**
     * @returns {Workspace}
     */
    get current() {
        return this._current;
    }

    /**
     * @param {Workspace} aWorkspace
     * @returns {boolean}
     */
    hasAlreadyOpened(aWorkspace) {
        return this._workspaces.some(workspace => workspace.equals(aWorkspace));
    }

    /**
     * @param {string} filePath
     * @returns {Workspace}
     */
    findWorkspaceByFilePath(filePath) {
        return this._workspaces.find(workspace => filePath === workspace.textlintrc.filePath);
    }

    /**
     * @param {Workspace} workspace
     */
    addWorkspace(workspace) {
        if (this.hasAlreadyOpened(workspace)) {
            return;
        }
        this._workspaces.push(workspace);
    }
}