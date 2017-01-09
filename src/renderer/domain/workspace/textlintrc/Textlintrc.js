// MIT © 2017 azu
"use strict";
import Validator from "./TextlintrcValidator";
const stripJsonComments = require("strip-json-comments");
const toPackageList = require("textlintrc-to-pacakge-list");
export default class Textlintrc {
    /**
     * @type {String|null}
     * @private
     */
    _textValue;
    /**
     * @type {Object|null}
     * @private
     */
    _jsonValue;

    /**
     * @type {String|null}
     */
    filePath;

    constructor({content, filePath}) {
        this.filePath = filePath;
        this.content = content;
        if (Validator.validate(content)) {
            this._jsonValue = JSON.parse(stripJsonComments(content));
        } else {
            this._jsonValue = {}
        }
    }

    /**
     * @returns {String|null}
     */
    get textValue() {
        return this.content;
    }

    /**
     * @returns {Object|null}
     */
    get jsonValue() {
        return this._jsonValue;
    }

    /**
     * Can access to filePath?
     * @returns {boolean}
     */
    get canAccessToFile() {
        return this.filePath !== null;
    }

    /**
     * is valid as configuration
     * @returns {boolean}
     */
    get isValid() {
        return Validator.validate(this._textValue);
    }

    get packageNames() {
        if (!this.isValid) {
            return [];
        }
        return toPackageList(this._jsonValue);
    }

    /**
     * update content
     * @param {string} content
     * @returns {Textlintrc}
     */
    updateContent(content) {
        return new Textlintrc(Object.assign({}, this, {content}));
    }

    /**
     * @param {Textlintrc} textlintrc
     */
    equals(textlintrc) {
        return textlintrc.filePath === this.filePath;
    }

    toJSON() {
        return this._jsonValue;
    }
}