// MIT © 2017 azu
"use strict";
import {ReduceStore, ReduceState} from "almin-reduce-store";
// use-case
import InstallTextlintPackageUseCase from "../../use-case/workspace/InstallTextlintPackageUseCase";
export class TextlintrcEditorState extends ReduceState {
    /**
     * @param {Workspace} [workspace]
     * @param {Textlintrc} [textlintrc]
     * @param {boolean} [isLoading]
     */
    constructor({
        workspace = {},
        textlintrc = {},
        isLoading = false
    } = {}) {
        super();
        this.workspace = workspace;
        this.workingDirectory = workspace.directory;
        this.modulesDirectory = workspace.modulesDirectory;
        // textlintrc
        this.textlintrc = textlintrc;
        this.isValid = textlintrc.isValid;
        this.textValue = textlintrc.textValue;
        this.jsonValue = textlintrc.jsonValue;
        this.packageNames = textlintrc.packageNames;
        this.canAccessToFile = textlintrc.canAccessToFile;
        this.filePath = textlintrc.filePath;
        // state
        this.isLoading = isLoading;
    }

    /**
     *
     * @param {TextlintApp} textlintApp
     * @returns {TextlintrcEditorState}
     */
    update({textlintApp}) {
        const currentWorkspace = textlintApp.workspaces.current;
        const textlintrc = currentWorkspace.textlintrc;
        return new TextlintrcEditorState(Object.assign({}, this, {
            workspace: currentWorkspace,
            textlintrc
        }));
    }

    reduce(payload) {
        switch (payload.type) {
            case InstallTextlintPackageUseCase.Events.beginInstall:
                return new TextlintrcEditorState(Object.assign({}, this, {isLoading: true}));
            case InstallTextlintPackageUseCase.Events.successInstall:
            case InstallTextlintPackageUseCase.Events.failureInstall:
                return new TextlintrcEditorState(Object.assign({}, this, {isLoading: false}));
            default:
                return this;
        }
    }
}
export default class TextlintrcEditorStore extends ReduceStore {
    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({textlintAppRepository}) {
        super();
        this.state = new TextlintrcEditorState();
        textlintAppRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return {
            textlintrcEditor: this.state
        };
    }

    _onChange(textlintApp) {
        this.setState(this.state.update({textlintApp}));
    }
}