// MIT © 2017 azu
"use strict";
const debug = require("debug")("textlint-app:UpdateWorkspaceDirectoryUseCase");
import {UseCase} from "almin";
// domain
import WorkspaceFactory from "../../domain/workspace/WorkspaceFactory";
import Textlintrc from "../../domain/workspace/textlintrc/Textlintrc";
import PackageManger from "../../infra/api/PackageManger";
import textlintAppRepository from "../../infra/repository/TextlintAppRepository";
// repository
export default class UpdateWorkspaceDirectoryUseCase extends UseCase {
    static create() {
        return new this({textlintAppRepository});
    }

    constructor({textlintAppRepository}) {
        super();
        this.textlintAppRepository = textlintAppRepository;
    }

    /**
     * @param {string} workspaceDirectory
     * @returns {Promise}
     */
    execute(workspaceDirectory) {
        const app = this.textlintAppRepository.lastUsed();
        return PackageManger.getTextlinrc(workspaceDirectory).then(({content, filePath}) => {
            debug("load textlintrc", filePath);
            const newWorkspace = WorkspaceFactory.create({
                directory: workspaceDirectory,
                textlintrc: new Textlintrc({content, filePath})
            });
            app.workspaces.useWorkspace(newWorkspace);
            this.textlintAppRepository.save(app);
        }).catch(error => {
            debug("Not found textlintrc", error);
            const newWorkspace = WorkspaceFactory.create({
                directory: workspaceDirectory
            });
            app.workspaces.useWorkspace(newWorkspace);
            this.textlintAppRepository.save(app);
        });
    }
}
