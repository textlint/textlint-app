// MIT © 2017 azu
"use strict";
import {UseCase} from "almin";
// repository
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";
import ReloadCurrentWorkspaceUseCase from "./ReloadCurrentWorkspaceUseCase";
// api
import PackageManger from "../../infra/api/PackageManger";
export default class InstallTextlintPackageUseCase extends UseCase {
    static create() {
        return new InstallTextlintPackageUseCase({
            textlintAppRepository
        });
    }

    static Events = {
        beginInstall: Symbol("begin"),
        successInstall: Symbol("success"),
        failureInstall: Symbol("failure")
    };

    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    execute() {
        const app = this.textlintAppRepository.lastUsed();
        this.dispatch({type: InstallTextlintPackageUseCase.Events.beginInstall});
        return PackageManger.install(app.workspaces.current).then(() => {
            this.dispatch({type: InstallTextlintPackageUseCase.Events.successInstall});
        }).then(() => {
            return this.context.useCase(ReloadCurrentWorkspaceUseCase.create()).execute();
        }).catch(error => {
            this.dispatch({type: InstallTextlintPackageUseCase.Events.failureInstall});
            return Promise.reject(error);
        });
    }
}
