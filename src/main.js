const { app, BrowserWindow } = require('electron');
const path = require('path');
const AirclassManagement = require('./airclass/airclassManagement')
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './airclass/preload.js'),
      contextIsolation: true
    },
  });

  // AirClass
  new AirclassManagement();

  win.loadFile(path.join(__dirname, './index.html'));
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