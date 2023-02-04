const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { parse } = require("qs");
const { MESSAGE_FROM_RENDER_TO_MAIN } = require("./airclass/constants");
let entryWin;
const createWindow = () => {
  entryWin = new BrowserWindow({
    width: 300,
    height: 300,
    x: 200,
    y: 0,
    name: "airclass入口",
    /** 透明窗口属性 **/
    // transparent: true,
    // backgroundColor: '#00000000',
    // resizable: false,
    // movable: false,
    frame: false,
    webPreferences: {
      // preload: path.join(__dirname, './airclass/preload.js'),
      // contextIsolation: true
      // nativeWindowOpen: true

      preload: path.join(__dirname, "./airclass/preload.js"),
      contextIsolation: true,
      nativeWindowOpen: true, // 如果要在render进程中通过window.open打开新的窗口，则需要设置这个值为true
    },
  });

  entryWin.webContents.on(
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
          const wind = new BrowserWindow(options);
          event.newGuest = wind;

          wind.on("closed", (event) => {
            const windtemp = event.sender;
            myWindows = myWindows.filter((w) => windtemp !== w);
          });
          myWindows.push(wind);
        } catch (error) {
          console.log("error....====", erro);
        }
      }
    }
  );
  entryWin.name = 'entry'
  entryWin.loadURL("http://localhost:3000");
};
let myWindows = [];
// app.on("browser-window-focus", (event) => {
//   const win = event.sender;
//   // console.log("窗口聚焦=====", win);
//   console.log("某个窗口聚焦====", myWindows);
// });
app.on("browser-window-blur", (event) => {
  const win = event.sender;
  // console.log('失去焦点的窗口.....', win)
  // const focusWindow = BrowserWindow.getFocusedWindow();
  // if(!focusWindow){
  //   return
  // }
  // if(focusWindow && focusWindow.frameName){
  //   const frameOptions = parse(focusWindow.frameName) || {};
  //   if(frameOptions.name === 'app-modal' ){
  //     console.log('hide===========')
  //     entryWin.hide();
  //   } 
  // } else {
  //   entryWin.show();
  // }
  console.log("获得焦点的窗口=====", BrowserWindow.getFocusedWindow());
});
ipcMain.on(MESSAGE_FROM_RENDER_TO_MAIN, (event, data) => {
  if (data.topic === "new-browser-window") {
    createWindow();
  }
});
