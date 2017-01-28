// MIT © 2017 azu
"use strict";
const fs = require("fs");
import {UseCase} from "almin";
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";

export default class UpdateTextUseCase extends UseCase {
    static create() {
        return new this({textlintAppRepository});
    }

    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    /**
     * @param {string} text
     */
    execute(text) {
        /** @type {TextlintApp} */
        const app = this.textlintAppRepository.lastUsed();
        app.textlintEditor.updateText(text);
        this.textlintAppRepository.save(app);
    }
}
