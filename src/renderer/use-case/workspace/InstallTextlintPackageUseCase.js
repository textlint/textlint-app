// MIT © 2017 azu
"use strict";
import {UseCase} from "almin";
// repository
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";
// api
import npmAPI from "../../infra/api/npm-api";
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
        return npmAPI.install(app.workspaces.current).then(() => {
            this.dispatch({type: InstallTextlintPackageUseCase.Events.successInstall});
        }).catch(error => {
            this.dispatch({type: InstallTextlintPackageUseCase.Events.failureInstall});
            return Promise.reject(error);
        });
    }
}