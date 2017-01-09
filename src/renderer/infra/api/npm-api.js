// MIT © 2017 azu
"use strict";
const remote = require("electron").remote;
const ServerPackageManager = remote.require("textlint-server-package-manager");
export default class PackageManger {
    /**
     * @param {Workspace} workspace
     */
    static install(workspace) {
        /**
         * @type {TextlintPackageManger}
         */
        const manager = new ServerPackageManager(workspace.directory);
        return manager.install(workspace.textlintrc.textValue);
    }
}