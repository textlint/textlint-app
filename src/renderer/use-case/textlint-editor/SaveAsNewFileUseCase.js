// MIT © 2017 azu
"use strict";
const fs = require("fs");
import { UseCase } from "almin";
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";

export default class SaveAsNewFileUseCase extends UseCase {
    static create() {
        return new this({ textlintAppRepository });
    }

    constructor({ textlintAppRepository }) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    execute(filePath) {
        return Promise.resolve().then(() => {
            /** @type {TextlintApp} */
            const app = this.textlintAppRepository.lastUsed();
            const text = app.textlintEditor.content.text;
            fs.writeFileSync(filePath, text, "utf-8");
        });
    }
}
