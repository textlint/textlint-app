// MIT © 2017 azu
"use strict";
import { UseCase } from "almin";
const debug = require("debug")("textlint-app:WriteToTextlintrcUseCase");
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";
import PackageManger from "../../infra/api/PackageManger";
export default class WriteToTextlintrcUseCase extends UseCase {
    static create() {
        return new this({ textlintAppRepository });
    }

    constructor({ textlintAppRepository }) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    execute() {
        const app = this.textlintAppRepository.lastUsed();
        const textlintrc = app.workspaces.current.textlintrc;
        if (!textlintrc.canAccessToFile) {
            debug("can not access .textlint: %s", textlintrc.filePath);
            return;
        }
        const directory = app.workspaces.current.directory;
        const textContent = textlintrc.textValue;
        return PackageManger.writeTextlintrc(directory, textContent);
    }
}
