// MIT © 2017 azu
"use strict";
import {app, protocol} from "electron";
import Application from "./Application";
let application = null;
function startRenderApp() {
    application = new Application();
    application.launch();
}
function installExtension() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'development') {
            const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

            const extension = 'REACT_DEVELOPER_TOOLS';
            const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
            return installer.default(installer[extension], forceDownload).then(resolve, reject);
        }
        resolve();
    });

}
// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (application.isDeactived) {
        application.launch();
    } else {
        application.show();
    }
});

app.on('ready', function() {
    installExtension().then(() => {
        startRenderApp();
    });
});
