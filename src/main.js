const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const { parse } = require("qs");
// const AirclassManagement = require("./airclass/airclassManagement");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    /** 透明窗口属性 **/
    // transparent: true,
    // backgroundColor: '#00000000',
    // resizable: false,
    // movable: false,
    // frame: false,
    webPreferences: {
      // preload: path.join(__dirname, './airclass/preload.js'),
      // contextIsolation: true
      // nativeWindowOpen: true

      preload: path.join(__dirname, "./airclass/preload.js"),
      contextIsolation: true,
      nativeWindowOpen: true, // 如果要在render进程中通过window.open打开新的窗口，则需要设置这个值为true
    },
  });

  // AirClass
  // new AirclassManagement();
  // win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  //   console.log('main...', frameName)
  //   if (frameName === 'modal') {

  //     // open window as modal
  //     event.preventDefault()
  //     Object.assign(options, {
  //       modal: true,
  //       // parent: win,
  //       // width: 100,
  //       // height: 100
  //     })
  //   }
  //   event.newGuest = new BrowserWindow(options)
  // })


  // win.loadURL('http://192.168.1.103:3000/')
  // win.loadFile(path.join(__dirname, './index.html'));
  // win.webContents.openDevTools()
  // win.loadFile(path.join(__dirname, './index.html'));

  win.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options, additionalFeatures) => {
      const frameOptions = parse(frameName) || {};
      for (let key in frameOptions) {
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
        event.newGuest = new BrowserWindow(options);
      }
    }
  );
  win.loadURL("http://localhost:3000/open-test");
  win.webContents.openDevTools();
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
