// MIT © 2017 azu
"use strict";
import { StoreGroup } from "almin";
import textlintAppRepository from "../infra/repository/TextlintAppRepository";
import TextlintrcEditorStore from "./TextlintrcEditor/TextlintrcEditorStore";
import TextlintEditorStore from "./TextlintEditor/TextlintEditorStore";
export default class AppStore {
    static create() {
        return new StoreGroup({
            "textlintrcEditor": new TextlintrcEditorStore({
                textlintAppRepository
            }),
            "textlintEditor": new TextlintEditorStore({
                textlintAppRepository
            })
        });
    }
}
