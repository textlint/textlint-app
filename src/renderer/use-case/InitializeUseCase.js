// MIT © 2017 azu
"use strict";
const remote = require("electron").remote;
const app = remote.app;
const path = require("path");
const debug = require("debug")("textlint-app:InitializeUseCase");
import {UseCase} from "almin";
// domain
import TextlintAppFactory from "../domain/TextlintAppFactory";
import Textlintrc from "../domain/workspace/textlintrc/Textlintrc";
// repository
import textlintAppRepository from "../infra/repository/TextlintAppRepository";
// api
import PackageManger from "../infra/api/PackageManger";
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
        return PackageManger.getTextlinrc(defaultWorkspaceDirectory).then(({content, filePath}) => {
            debug("load textlintrc", filePath);
            const newApp = TextlintAppFactory.create({
                directory: defaultWorkspaceDirectory,
                textlintrc: new Textlintrc({content, filePath})
            });
            this.textlintAppRepository.save(newApp);
        }).catch(error => {
            debug("Not found textlintrc", error);
            const newApp = TextlintAppFactory.create({
                directory: defaultWorkspaceDirectory
            });
            this.textlintAppRepository.save(newApp);
        });
    }
}
