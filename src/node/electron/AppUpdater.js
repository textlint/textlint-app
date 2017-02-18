// MIT © 2017 azu
"use strict";
import {BrowserWindow} from "electron";
import {dialog} from "electron";
import {autoUpdater} from "electron-updater";
const os = require("os");
const isDev = require("electron-is-dev");

/**
 * @param {string} title
 * @param {string} message
 */
function notify(title, message) {
    const windows = BrowserWindow.getAllWindows();
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

export default class AppUpdater {
    constructor() {
        if (isDev) {
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
