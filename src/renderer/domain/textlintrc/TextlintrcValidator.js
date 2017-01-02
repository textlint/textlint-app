// MIT © 2017 azu
"use strict";
const stripJsonComments = require("strip-json-comments");
export default class TextlintrcValidator {
    /**
     * is valid as textlintrc content
     * @param {string|*} content
     * @returns {boolean}
     */
    static validate(content) {
        if (typeof content !== "string") {
            return false;
        }
        const noCommentValue = stripJsonComments(content);
        try {
            JSON.parse(noCommentValue);
            return true;
        } catch (e) {
            return false;
        }
    }
}