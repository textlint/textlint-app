// MIT © 2017 azu
"use strict";
import {QueuedStoreGroup} from "almin";
import textlintAppRepository from "../infra/repository/TextlintAppRepository";
import TextlintrcEditorStore from "./TextlintrcEditor/TextlintrcEditorStore";
import TextlintEditorStore from "./TextlintEditor/TextlintEditorStore";
export default class AppStore {
    static create() {
        return new QueuedStoreGroup([
            new TextlintrcEditorStore({
                textlintAppRepository
            }),
            new TextlintEditorStore({
                textlintAppRepository
            })
        ]);
    }
}
