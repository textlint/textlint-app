// MIT © 2017 azu
"use strict";
const fs = require("fs");
import {UseCase} from "almin";
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";

export default class OpenNewFileUseCase extends UseCase {
    static create() {
        return new this({textlintAppRepository});
    }

    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    execute(filePath) {
        return Promise.resolve().then(() => {
            const text = fs.readFileSync(filePath, "utf-8");
            /** @type {TextlintApp} */
            const app = this.textlintAppRepository.lastUsed();
            app.textlintEditor.openNewFile({
                text,
                filePath
            });
            this.textlintAppRepository.save(app);
        });
    }
}
