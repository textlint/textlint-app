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
        console.log("install", workspace);
        return manager.install(workspace.textlintrc.textValue);
    }

    /**
     * @param {string} directory
     * @returns {Promise.<{content:string, filePath:string}>}
     */
    static getTextlinrc(directory) {
        const manager = new ServerPackageManager(directory);
        return manager.getTextlintrc().then(content => {
            return {
                content,
                filePath: manager.textlintrcFilePath
            };
        });
    }
}
