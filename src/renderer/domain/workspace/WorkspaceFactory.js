// MIT © 2017 azu
"use strict";
import Workspace from "./Workspace";
import EmptyTextlintrc from "./textlintrc/EmptyTextlintrc";
export default class WorkspaceFactory {
    static create({directory}) {
        return new Workspace({
            textlintrc: new EmptyTextlintrc(),
            directory
        });
    }
}