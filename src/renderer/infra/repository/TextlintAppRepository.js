// MIT © 2017 azu
"use strict";
const EventEmitter = require("events");
const REPOSITORY_CHANGE = "REPOSITORY_CHANGE";
import MemoryDB from "./adpter/MemoryDB";
// Collection repository
export class TextlintAppRepository extends EventEmitter {
    constructor(database = new MemoryDB()) {
        super();
        /**
         * @type {MemoryDB}
         */
        this._database = database;
    }

    /**
     * @param {*} id
     * @private
     */
    _get(id) {
        // Domain.<id>
        return this._database.get(`${id}`);
    }

    /**
     * @param {TextlintAppId} id
     * @returns {TextlintApp|undefined}
     */
    findById(id) {
        return this._get(id.id);
    }

    /**
     * @returns {TextlintApp|undefined}
     */
    lastUsed() {
        const app = this._database.get("lastUsed");
        if (!app) {
            return;
        }
        return this._get(app.id);
    }

    /**
     * @param {TextlintApp} textlintApp
     */
    save(textlintApp) {
        this._database.set("lastUsed", textlintApp);
        this._database.set(`${textlintApp.id}`, textlintApp);
        this.emit(REPOSITORY_CHANGE, textlintApp);
    }

    /**
     * @param {TextlintApp} app
     */
    remove(app) {
        this._database.delete(`${app.id}`);
        this.emit(REPOSITORY_CHANGE);
    }

    onChange(handler) {
        this.on(REPOSITORY_CHANGE, handler);
    }
}
// singleton
export default new TextlintAppRepository();
