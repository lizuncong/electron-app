// require('./memory-usage')
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { parse } = require("qs");

function createWindow () {
  const win = new BrowserWindow({
    width: 85,
    height: 85,
    frame: false,
    resizable: false,
    movable:true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, './preload.js')
    },
    transparent: true
  })
  win.setContentBounds({
    x: -800,
    y: -800,
    width: 1600,
    height: 1600,
  });
  ipcMain.on('set-bounds', (event, params) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    console.log('setboun ds....', params, params.width)
    const {width, height, originX, originY} = params;
    const currentBounds = win.getBounds();
    win.setContentSize(width, height)

    const {x: currentX, y: currentY, width: currentW, height: currentH} = currentBounds
    win.setBounds({ x: currentX - originX + currentW, y: currentY - originY + currentH, width, height })
  })
  // win.setIgnoreMouseEvents(true)

  win.webContents.openDevTools({
    mode: 'undocked'
  });
  win.loadURL('http://localhost:3000/')
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
