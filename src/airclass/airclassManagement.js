const { ipcMain, BrowserWindow } = require("electron");
const {
  MESSAGE_FROM_RENDER_TO_MAIN,
  MESSAGE_CHANNEL_FOR_RENDER_MAIN,
  MESSAGE_FROM_MAIN_TO_RENDER,
} = require("./constants");
const ImServiceWindow = require('./imServiceWindow')

class AirclassManagement {
  constructor() {
    this.windows = []; // 管理页面窗口
    this.hooks = {};
    this.initMessageListener(); // 监听渲染进程消息
    this.imWindow = new ImServiceWindow(); // 用于和IM建立连接的透明窗口
  }
  initMessageListener() {
    // 单向通信：监听渲染进程的消息
    ipcMain.on(MESSAGE_FROM_RENDER_TO_MAIN, (event, data) => {
      const webContents = event.sender;
      const win = BrowserWindow.fromWebContents(webContents);
      win.setTitle(data.topic);
    });

    // 双向通信：监听渲染进程的消息，并返回结果给渲染进程
    ipcMain.handle(MESSAGE_CHANNEL_FOR_RENDER_MAIN, async (event, data) => {
      const webContents = event.sender;
      const win = BrowserWindow.fromWebContents(webContents);
      win.setTitle(data.topic);
      return "修改成功";
    });
  }
  sendMessageToRenderProcess(data) {
    this.windows.forEach((win) => {
      win.webContents.send(MESSAGE_FROM_MAIN_TO_RENDER, {
        body: data,
      });
    });
  }
}

module.exports = AirclassManagement;
