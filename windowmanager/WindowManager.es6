const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

module.exports = class WindowManager {
    constructor() {
        this.windows = [];
        this.currentWindow = null;
    }

    createWindow() {
        // Create the browser window.
        let win = new BrowserWindow({ width: 800, height: 600, 'node-integration': false });
        this.currentWindow = win;

        // and load the index.html of the app.
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../window/window.html'),
            protocol: 'file:',
            slashes: true
        }));

        win.on('focus', () => {
            console.log("focus");
            this.currentWindow = win;
        });

        win.on('closed', () => {
            // 閉じた時にWindowsから削除
            this.windows.some((window, i) => {
                if (window == win) {
                    this.windows.splice(i, 1);
                }
            });
            win = null;
        });

        this.windows.push(win);
    }

    deleteWindow() {

    }
}