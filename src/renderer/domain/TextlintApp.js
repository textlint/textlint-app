// MIT © 2017 azu
"use strict";
import TextlintAppId from "./TextlintAppId";
import TextlintrcList from "./textlintrc/TextlintrcList";
export default class TextlintApp {

    /**
     * @type {TextlintAppId}
     */
    id;

    constructor() {
        this.id = new TextlintAppId();
        this.textlintrcList = new TextlintrcList();
    }
}