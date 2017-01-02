// MIT © 2017 azu
"use strict";
import {StoreGroup} from "almin";
import textlintAppRepository from "../infra/repository/TextlintAppRepository";
import TextlintrcEditorStore from "./TextlintrcEditor/TextlintrcEditorStore";
export default class AppStore {
    static create() {
        return new StoreGroup([
            new TextlintrcEditorStore({
                textlintAppRepository
            })
        ]);
    }
}
