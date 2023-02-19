const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { parse } = require("qs");

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
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
        };
        try {
          let wind = new BrowserWindow(options);
          // wind.webContents.openDevTools()
          event.newGuest = wind;

          wind.on("closed", (event) => {
            console.log("子窗口关闭了======");
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

  mainWindow.loadURL("http://localhost:3000/memory-usage");

  // mainWindow.loadFile(path.join(__dirname, "index.html"));
  // mainWindow.webContents.openDevTools();
};

const createChildWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    x: 100,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nativeWindowOpen: true,
      contextIsolation: true,
    },
  });
  mainWindow.loadURL("http://localhost:3000/images");
  // mainWindow.webContents.openDevTools();

  // mainWindow.loadFile(path.join(__dirname, "child.html"));
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("open-window", (event, data) => {
    console.log("receivemessage from render");
    createChildWindow();
  });
  ipcMain.handle("get-main-process-id", (event) => {
    return {
      pid: process.pid
    }
  });
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
