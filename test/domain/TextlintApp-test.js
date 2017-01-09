// MIT © 2017 azu
"use strict";
const assert = require("assert");
import TextlintApp from "../../src/renderer/domain/TextlintApp.js";
import TextlintAppFactory from "../../src/renderer/domain/TextlintAppFactory.js";
describe("TextlintApp", () => {
    it("should return TextlintApp instance", () => {
        const app = TextlintAppFactory.create({
            directory: __dirname
        });
        assert(app instanceof TextlintApp);
    });
});
