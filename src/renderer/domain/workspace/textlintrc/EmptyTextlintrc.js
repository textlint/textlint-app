// MIT © 2017 azu
"use strict";
import Textlintrc from "./Textlintrc";
export default class EmptyTextlintrc extends Textlintrc {
    constructor() {
        super({
            content: "",
            filePath: null
        });
    }
}
