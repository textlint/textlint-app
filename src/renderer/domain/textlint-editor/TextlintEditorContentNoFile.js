// MIT © 2017 azu
"use strict";
import TextlintEditorContent from "./TextlintEditorContent";
const os = require("os");
const path = require("path");
export default class TextlintEditorContentNoFile extends TextlintEditorContent {
    constructor({text}) {
        const tmpFile = path.join(os.tmpdir(), "tmp.md");
        super({text, filePath: tmpFile});
    }
}
