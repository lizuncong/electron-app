const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setBounds: (params) => ipcRenderer.send('set-bounds', params)
})