// MIT © 2017 azu
"use strict";
import i18next from"i18next";
import { Store } from "almin";
// use-case
import { DismissInstallErrorType } from "../../use-case/textlintrc/DismissInstallErrorUseCase";
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
     * @param {boolean} [isLoading]
     * @param {Error} [installFailureError]
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
                    isLoading,
                    installFailureError
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
        this.installFailureError = installFailureError;
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
                return new TextlintrcEditorState(Object.assign({}, this, { isLoading: false }));
            case InstallTextlintPackageUseCase.Events.failureInstall:
                return new TextlintrcEditorState(Object.assign({}, this, {
                    isLoading: false,
                    installFailureError: new Error(i18next.t("Failed to install. Please check .textlintrc and Press Install again."))
                }));
            case DismissInstallErrorType:
                return new TextlintrcEditorState(Object.assign({}, this, {
                    installFailureError: undefined
                }));
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
        this.state = new TextlintrcEditorState({
            isLoading: false
        });
        this.textlintAppRepository = textlintAppRepository;
    }

    receivePayload(payload) {
        const app = this.textlintAppRepository.lastUsed();
        if (!app) {
            return;
        }
        const baseState = this.state.update({ textlintApp: app });
        this.setState(baseState.reduce(payload));
    }

    getState() {
        return this.state;
    }
}
