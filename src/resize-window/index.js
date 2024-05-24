// require('./memory-usage')
const { app, ipcMain, BrowserView, BrowserWindow } = require("electron");
const path = require("path");
const { parse } = require("qs");

function createWindow () {
  const win = new BrowserWindow({
    width: 100,
    height: 100,
    frame: false,
    resizable: false,
    movable:true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    },
    // transparent: true
  })
  // win.setContentBounds({
  //   x: 100,
  //   y: 100,
  //   width: 500,
  //   height: 500,
  // });
  const view = new BrowserView()
  win.setBrowserView(view)
  view.setBounds({ x: -350, y: -350, width: 800, height: 800 })
  view.webContents.loadURL('http://localhost:3000/')
  view.webContents.openDevTools({
    mode: 'undocked'
  });
    // console.log('init...', win.getBrowserView())
  ipcMain.on('se t-bounds', (event, params) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    console.log('setboun ds....', params, params.width)
    const {width, height, originX, originY} = params;
    const currentBounds = win.getBounds();
    // win.setContentSize(width, height)

    const {x: currentX, y: currentY, width: currentW, height: currentH} = currentBounds
    // win.setBounds({ x: currentX - originX + currentW, y: currentY - originY + currentH, width, height })
  })
  // win.setIgnoreMouseEvents(true)

  // win.webContents.openDevTools({
  //   mode: 'undocked'
  // });
  // win.loadURL('http://localhost:3000/')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
