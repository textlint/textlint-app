// MIT © 2017 azu
"use strict";
import TextlintAppId from "./TextlintAppId";
import Workspaces from "./workspace/Workspaces";
export default class TextlintApp {

    /**
     * @type {TextlintAppId}
     */
    id;

    constructor() {
        this.id = new TextlintAppId();
        this.workspaces = new Workspaces();
    }
}