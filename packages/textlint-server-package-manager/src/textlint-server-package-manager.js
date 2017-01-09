// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const npm = require("@azu/npm-programmatic");
const toPackageList = require("textlintrc-to-pacakge-list");
const stripJsonComments = require("strip-json-comments");
module.exports = class TextlintPackageManger {
    constructor(packageDirectory) {
        this.packageDirectory = packageDirectory;
        const textlintrcFileName = ".textlintrc";
        this.textlintrcFilePath = path.join(this.packageDirectory, textlintrcFileName);
    }

    /**
     * Install textlint rule package written in `textlintrc`
     * @param {string} textlintrc
     * @return {Promise}
     */
    install(textlintrc) {
        return Promise.resolve().then(() => {
            const json = JSON.parse(stripJsonComments(textlintrc));
            return toPackageList(json);
        }).then(packageNames => {
            mkdirp.sync(this.packageDirectory);
            this.createPackageJSON();
            return npm.install(packageNames, {
                cwd: this.packageDirectory,
                save: true
            })
        }).then(() => {
            return this.writeTextlintrc(textlintrc);
        });
    }

    /**
     * @returns {Promise}
     */
    getTextlintrc() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.textlintrcFilePath, "utf-8", (error, content) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(content);
                }
            })
        });
    }

    /**
     * check integrity textlintrc and installed packages.
     * @returns {Promise}
     */
    checkIntegrity() {
        return npm.list(this.packageDirectory).then((packageNames) => {
            return this.getTextlintrc().then(() => {
                const packageNames = toPackageList(this.textlintrcFilePath);
                return packageNames.every((packageName) => {
                    return packageNames.indexOf(packageName) !== -1;
                });
            });
        });
    }


    /**
     * @param {string} textlintrc
     * @returns {Promise}
     */
    writeTextlintrc(textlintrc) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.textlintrcFilePath, textlintrc, "utf-8", (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    createPackageJSON() {
        const packageFilePath = path.join(this.packageDirectory, "package.json");
        if (fs.existsSync(packageFilePath)) {
            return;
        }
        fs.writeFileSync(packageFilePath, JSON.stringify(this._createPackageContent(), null, 4), "utf-8");
    }

    /**
     * create minimal package.json
     * @returns {Object}
     * @private
     */
    _createPackageContent() {
        return {
            "private": true
        }
    }
};