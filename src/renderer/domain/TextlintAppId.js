// MIT © 2017 azu
"use strict";
let id = 0;
export default class TextlintAppId {
    id;

    constructor() {
        this.id = id++;
    }

    /**
     * @param {TextlintAppId} id
     * @returns {boolean}
     */
    equals(id) {
        return this.id === id.id;
    }

    toString() {
        return String(this.id);
    }

    valueOf() {
        return this.id;
    }
}
