// MIT © 2017 azu
"use strict";
const remote = require("electron").remote;
const app = remote.app;
const path = require("path");
import {UseCase} from "almin";
// domain
import TextlintAppFactory from "../domain/TextlintAppFactory";
// repository
import textlintAppRepository from "../infra/repository/TextlintAppRepository";
export default class InitializeUseCase extends UseCase {
    static create() {
        return new InitializeUseCase({
            textlintAppRepository
        });
    }

    /**
     * @param {TextlintAppRepository} textlintAppRepository
     */
    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    execute() {
        const defaultWorkspaceDirectory = path.join(app.getPath("userData"), "textlint/default");
        const newApp = TextlintAppFactory.create(defaultWorkspaceDirectory);
        this.textlintAppRepository.save(newApp);
    }
}