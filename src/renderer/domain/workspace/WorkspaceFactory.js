// MIT © 2017 azu
"use strict";
import Workspace from "./Workspace";
import EmptyTextlintrc from "./textlintrc/EmptyTextlintrc";
export default class WorkspaceFactory {
    /**
     * @param {string} directory
     * @param {Textlintrc} [textlintrc]
     * @returns {Workspace}
     */
    static create({directory, textlintrc}) {
        return new Workspace({
            textlintrc: textlintrc ? textlintrc : new EmptyTextlintrc(),
            directory
        });
    }
}
