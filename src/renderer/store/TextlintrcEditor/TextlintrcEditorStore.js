// MIT © 2017 azu
"use strict";
import { Store } from "almin";
// use-case
import InstallTextlintPackageUseCase from "../../use-case/workspace/InstallTextlintPackageUseCase";
export class TextlintrcEditorState {

    /**
     * @param {string} [workingDirectory]
     * @param {string} [modulesDirectory]
     * @param {string} [isValid]
     * @param {string} [textValue]
     * @param {string} [jsonValue]
     * @param {string} [packageNames]
     * @param {string} [canAccessToFile]
     * @param {string} [filePath]
     * @param {boolean} isLoading
     */
    constructor({
                    workingDirectory,
                    modulesDirectory,
                    isValid,
                    textValue,
                    jsonValue,
                    packageNames,
                    canAccessToFile,
                    filePath,
                    isLoading
                } = {}) {
        this.workingDirectory = workingDirectory;
        this.modulesDirectory = modulesDirectory;
        // textlintrc
        this.isValid = isValid;
        this.textValue = textValue;
        this.jsonValue = jsonValue;
        this.packageNames = packageNames;
        this.canAccessToFile = canAccessToFile;
        this.filePath = filePath;
        // state
        this.isLoading = isLoading;
    }

    /**
     *
     * @param {TextlintApp} textlintApp
     * @returns {TextlintrcEditorState}
     */
    update({ textlintApp }) {
        const currentWorkspace = textlintApp.workspaces.current;
        const textlintrc = currentWorkspace.textlintrc;
        return new TextlintrcEditorState(Object.assign({}, this, {
            workingDirectory: currentWorkspace.directory,
            modulesDirectory: currentWorkspace.modulesDirectory,
            isValid: textlintrc.isValid,
            textValue: textlintrc.textValue,
            jsonValue: textlintrc.jsonValue,
            packageNames: textlintrc.packageNames,
            canAccessToFile: textlintrc.canAccessToFile,
            filePath: textlintrc.filePath
        }));
    }

    reduce(payload) {
        switch (payload.type) {
            case InstallTextlintPackageUseCase.Events.beginInstall:
                return new TextlintrcEditorState(Object.assign({}, this, { isLoading: true }));
            case InstallTextlintPackageUseCase.Events.successInstall:
            case InstallTextlintPackageUseCase.Events.failureInstall:
                return new TextlintrcEditorState(Object.assign({}, this, { isLoading: false }));
            default:
                return this;
        }
    }
}
export default class TextlintrcEditorStore extends Store {
    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({ textlintAppRepository }) {
        super();
        this.state = new TextlintrcEditorState();
        textlintAppRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return this.state;
    }

    _onChange(textlintApp) {
        this.setState(this.state.update({ textlintApp }));
    }
}
