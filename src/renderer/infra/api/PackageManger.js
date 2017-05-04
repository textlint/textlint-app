// MIT © 2017 azu
"use strict";
const debug = require("debug")("textlint-app:PackageManger");
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
        debug("Installing from ", manager.textlintrcFilePath);
        // TODO: always flush and install
        // We should implement package.update
        return manager.install(workspace.textlintrc.textValue, {
            force: true
        });
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

    /**
     * @param {string} directory
     * @param {string} textlintrcContent
     * @returns {Promise}
     */
    static writeTextlintrc(directory, textlintrcContent) {
        const manager = new ServerPackageManager(directory);
        return manager.writeTextlintrc(textlintrcContent);
    }


    /**
     * Check integrity between .textlintrc and installed module
     * @param {string} directory
     * @returns {Promise.<Boolean>}
     */
    static checkIntegrity(directory) {
        /**
         * @type {TextlintPackageManger}
         */
        const manager = new ServerPackageManager(directory);
        return manager.checkIntegrity();
    }
}
