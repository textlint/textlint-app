// MIT © 2017 azu
"use strict";
const assert = require("assert");
const path = require("path");
const PackageManager = require("../src/textlint-server-package-manager");
describe("PackageManager", () => {
    it("has ", () => {
        const pkg = new PackageManager(__dirname);
        assert(pkg.packageDirectory === __dirname);
        assert(pkg.textlintrcFilePath === path.join(__dirname, ".textlintrc"));
    })
});