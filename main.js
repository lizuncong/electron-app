// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1800,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreenable: true,
    fullscreen: true,
    simpleFullscreen: true,
    // maximizable: false,
    // resizable: false,
    webPreferences: {
      // devTools: false,
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  require("@electron/remote/main").enable(mainWindow.webContents)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  ipcMain.on('message11', (event, arg) => {
    console.log('主进程接收到信息。。。', arg)
    event.reply('reply', 'hello from main process')
  })
  // const secondWindow = new BrowserWindow({
  //   width: 400,
  //   height: 300,
  //   webPreferences: {
  //     nodeIntegration: true
  //   },
  //   parent: mainWindow
  // })
  // secondWindow.loadFile('child.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  require('@electron/remote/main').initialize()
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
