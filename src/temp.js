const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const { parse } = require("qs");
// require('./class')

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 200,
    // height: 200,
    // x: 0,
    // y: 0,
    fullscreen: true,
    /** 透明窗口属性 **/
    transparent: true,
    backgroundColor: '#00000000',
    alwaysOnTop: true,
    // resizable: false,
    // movable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "./airclass/preload.js"),
      contextIsolation: true,
      nativeWindowOpen: true, // 如果要在render进程中通过window.open打开新的窗口，则需要设置这个值为true
    },
  });

  win.loadFile(path.join(__dirname, "./index.html"));
  // win.webContents.openDevTools();
};
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
