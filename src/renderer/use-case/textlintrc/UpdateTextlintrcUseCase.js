// MIT © 2017 azu
"use strict";
import {UseCase} from "almin";
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";
export default class UpdateTextlintrcUseCase extends UseCase {
    static create() {
        return new this({textlintAppRepository});
    }

    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    /**
     * @param {string} content
     */
    execute(content) {
        const app = this.textlintAppRepository.lastUsed();
        app.workspaces.current.updateCurrentContent(content);
        this.textlintAppRepository.save(app);
    }
}
