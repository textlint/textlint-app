// MIT © 2017 azu
"use strict";
import {UseCase} from "almin";
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";
import PackageManger from "../../infra/api/PackageManger";
import Textlintrc from "../../domain/workspace/textlintrc/Textlintrc";

export default class ReloadCurrentWorkspaceUseCase extends UseCase {
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
        return PackageManger.getTextlinrc(currentWorkspace.directory).then(({content, filePath}) => {
            const textlintrc = new Textlintrc({content, filePath});
            currentWorkspace.update({textlintrc, directory: currentWorkspace.directory});
            this.textlintAppRepository.save(app);
        });
    }
}
