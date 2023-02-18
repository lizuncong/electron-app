const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { parse } = require("qs");

let count = 0;
const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nativeWindowOpen: true,
      contextIsolation: true,
    },
  });
  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      const frameOptions = parse(frameName) || {};
      for (const key in frameOptions) {
        const v = frameOptions[key];
        if (v === "true" || v === "false" || !isNaN(Number(v))) {
          frameOptions[key] = JSON.parse(v);
        }
      }
      if (frameOptions.__portalType === "modal") {
        event.preventDefault();
        options = {
          ...options,
          ...frameOptions,
          hasShadow: false,
          // skipTaskbar: true,
        };
        try {
          let wind = new BrowserWindow(options);
          // wind.webContents.openDevTools()
          event.newGuest = wind;

          wind.on("closed", (event) => {
            console.log('子窗口关闭了======')
            wind = null;
            event.newGuest = null;
          });
          // myWindows.push(wind);
        } catch (error) {
          console.log("error....====", erro);
        }
      }
    }
  );
  mainWindow.loadURL("http://localhost:3000/");

  // mainWindow.loadFile(path.join(__dirname, "index.html"));

};

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("open-window", (event, data) => {
    console.log("receivemessage from render");
    createWindow();
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
