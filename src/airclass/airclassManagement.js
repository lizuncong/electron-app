const { ipcMain, BrowserWindow } = require("electron");
const path = require("path");
const {
  MESSAGE_FROM_RENDER_TO_MAIN,
  MESSAGE_CHANNEL_FOR_RENDER_MAIN,
  MESSAGE_FROM_MAIN_TO_RENDER,
} = require("./constants");
// const ImServiceWindow = require("./imServiceWindow");

class AirclassManagement {
  constructor() {
    this.windows = []; // 管理页面窗口
    this.hooks = {};
    this.initMessageListener(); // 监听渲染进程消息

    // 创建一个透明窗口用于和IM建立连接，并且负责转发信息
    this.imWindow = this.createBrowserWindow(
      {
        width: 500,
        height: 500,
        webPreferences: {
          preload: path.join(__dirname, "./preload.js"),
          contextIsolation: true,
        },
      },
      "http://localhost:3000/im-service"
    );
  }
  createBrowserWindow(config, url) {
    const win = new BrowserWindow({
      ...config,
      webPreferences: {
        preload: path.join(__dirname, "./preload.js"),
        contextIsolation: true,
      },
    });
    win.loadURL(url);
    win.webContents.openDevTools();
    return win;
  }
  initMessageListener() {
    // 单向通信：监听渲染进程的消息
    ipcMain.on(MESSAGE_FROM_RENDER_TO_MAIN, (event, data) => {
      // const webContents = event.sender;
      // const win = BrowserWindow.fromWebContents(webContents);
      // win.setTitle(data.topic);
      console.log("receivemessage from render", data);
      if (data.topic === "new-browser-window") {
        this.windows.push(
          this.createBrowserWindow(data.body.config, data.body.url)
        );
      }
      if (data.topic === "broadcast-store") {
        // 向所有的渲染进程广播store变更
        console.log("receivemessage from render2", this.windows.length);
        this.sendMessageToRenderProcess(data);
      }
    });

    // 双向通信：监听渲染进程的消息，并返回结果给渲染进程
    ipcMain.handle(MESSAGE_CHANNEL_FOR_RENDER_MAIN, async (event, data) => {
      // const webContents = event.sender;
      // const win = BrowserWindow.fromWebContents(webContents);
      // win.setTitle(data.topic);
      return "修改成功";
    });
  }
  sendMessageToRenderProcess(data) {
    this.windows.forEach((win) => {
      win.webContents.send(MESSAGE_FROM_MAIN_TO_RENDER, data);
    });
  }
}

module.exports = AirclassManagement;
