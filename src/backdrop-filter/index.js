// require('./memory-usage')
const { app, ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const { parse } = require("qs");

// https://blog.csdn.net/weixin_33744799/article/details/112955168
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, './preload.js')
    },
    transparent: true
  })

  win.loadFile(path.join(__dirname,'./index.html'))
  win.setVibrancy('appearance-based')
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
