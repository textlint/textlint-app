// MIT © 2017 azu
"use strict";
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


    /**
     * @param {Workspace} workspace
     */
    constructor(workspace) {
        // default workspace use empty textlintrc
        this._current = workspace;
    }

    /**
     * @returns {Workspace}
     */
    get current() {
        return this._current;
    }

    /**
     * @param {Workspace} workspace
     */
    set current(workspace) {
        this._current = workspace;
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

    /**
     * @param {Workspace} workspace
     */
    useWorkspace(workspace) {
        this.addWorkspace(workspace);
        this.current = workspace;
    }
}
