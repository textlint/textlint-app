// MIT © 2017 azu
"use strict";
const debug = require("debug")("textlint-app:FixTextUseCase");
import {UseCase} from "almin";
import TextLintAPI from "../../infra/textlint/TextlintAPI";
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";

export default class FixTextUseCase extends UseCase {
    static create() {
        return new this({textlintAppRepository});
    }

    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    execute() {
        const app = this.textlintAppRepository.lastUsed();
        const currentWorkspace = app.workspaces.current;
        if (!currentWorkspace.isSetupTextlint) {
            debug("Current workspace is not setup yet.");
            return;
        }
        const textlintAPI = new TextLintAPI({
            configFile: currentWorkspace.textlintrc.filePath,
            rulesBaseDirectory: currentWorkspace.modulesDirectory
        });
        return textlintAPI.fixText(app.textlintEditor.content.text, app.textlintEditor.content.fileExtension).then(result => {
            app.textlintEditor.updateText(result.output);
            this.textlintAppRepository.save(app);
        });
    }
}
