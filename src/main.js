const { app, BrowserWindow } = require('electron');
const path = require('path');
const AirclassManagement = require('./airclass/airclassManagement')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, './airclass/preload.js'),
      // contextIsolation: true
      nativeWindowOpen: true

    },
  });

  // AirClass
  // new AirclassManagement();
  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    console.log('main...', frameName)
    if (frameName === 'modal') {

      // open window as modal
      event.preventDefault()
      Object.assign(options, {
        modal: true,
        // parent: win,
        // width: 100,
        // height: 100
      })
    }
    event.newGuest = new BrowserWindow(options)
  })


  win.loadURL('http://192.168.1.103:3000/')
  // win.loadFile(path.join(__dirname, './index.html'));
  win.webContents.openDevTools()
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});