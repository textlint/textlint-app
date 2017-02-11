// MIT © 2017 azu
"use strict";
import {app} from "electron";
import {BrowserWindow} from "electron";
const url = require("url");
import path from "path";
import windowStateKeeper from "electron-window-state";
import AppUpdater from "./electron/AppUpdater";
export default class Application {
    get isDeactived() {
        return this.mainWindow === null;
    }

    constructor() {
        this.mainWindow = null;
    }

    launch() {
        // command line
        const mainWindowState = windowStateKeeper({
            defaultWidth: 800,
            defaultHeight: 600
        });
        const title = require("../../package.json").name;
        process.title = title;
        this.mainWindow = new BrowserWindow({
            title: title,
            x: mainWindowState.x,
            y: mainWindowState.y,
            width: mainWindowState.width,
            height: mainWindowState.height
        });
        const index = {
            html: "/app/index.html"
        };
        const format = url.format({
            pathname: path.join(__dirname, "..", "index.html"),
            protocol: "file:",
            slashes: true
        });
        this.mainWindow.loadURL(format);
        this.mainWindow.webContents.on("did-finish-load", () => {
            // loaded
        });
        // automatically (the listeners will be removed when the window is closed)
        // and restore the maximized or full screen state
        mainWindowState.manage(this.mainWindow);

        if (process.env.NODE_ENV !== "production") {
            this.mainWindow.openDevTools();
        }

        new AppUpdater();
    }

    show() {
        this.mainWindow.show();
    }

    hide() {
        this.mainWindow.hide();
    }
}
