// MIT © 2017 azu
"use strict";
import {BrowserWindow as BrowserWindowElectron, dialog} from "electron";
import {autoUpdater} from "electron-updater";
import * as os from "os";
const isDev = require("electron-is-dev");

export default class AppUpdater {
    constructor() {
        if (isDev()) {
            return;
        }

        const platform = os.platform();
        if (platform === "linux") {
            return;
        }

        autoUpdater.logger = console;
        autoUpdater.signals.updateDownloaded(it => {
            notify("A new update is ready to install", `Version ${it.version} is downloaded and will be automatically installed on Quit`);
        });
        autoUpdater.checkForUpdates();
    }
}

function notify(title, message) {
    const windows = BrowserWindowElectron.getAllWindows();
    if (windows.length === 0) {
        return;
    }
    const options = {
        type: "info",
        buttons: ["OK"],
        title: title,
        message: message
    };

    dialog.showMessageBox(windows[0], options);
}
