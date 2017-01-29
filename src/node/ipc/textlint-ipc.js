// MIT © 2017 azu
"use strict";
const ipcPromise = require("ipc-promise");
import TextLintAPIServer from "../infra/textlint/TextlintAPIServer";
import Key from "./textlint-ipc-key";
/**
 * register ipc
 */
export default function registerIPC() {
    const apiServer = new TextLintAPIServer();
    ipcPromise.on(Key.setup, ({
        configFile,
        rulesBaseDirectory
    }) => {
        apiServer.setup({
            configFile,
            rulesBaseDirectory
        });
    });
    ipcPromise.on(Key.lintText, ({text, ext}) => {
        return apiServer.lintText(text, ext);
    });
    ipcPromise.on(Key.fixText, ({text, ext}) => {
        return apiServer.fixText(text, ext);
    });
}
