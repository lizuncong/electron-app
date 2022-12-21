const { contextBridge, ipcRenderer } = require("electron");
const {
  MESSAGE_FROM_RENDER_TO_MAIN,
  MESSAGE_CHANNEL_FOR_RENDER_MAIN,
  MESSAGE_FROM_MAIN_TO_RENDER,
} = require("./constants");
contextBridge.exposeInMainWorld("electronApi", {
  // 渲染进程和主进程的通信按以下设计，渲染进程和主进程之间通信只开通三个接口，
  // 消息类型通过data.topic区分 data = { topic: '', body }
  // 1.单向通信：渲染进程给主进程发消息
  sendMessageToMain: (data) =>
    ipcRenderer.send(MESSAGE_FROM_RENDER_TO_MAIN, data),
  // 2.双向通信：渲染进程给主进程发消息，同时还能接收主进程的返回值
  sendMessageToMainWithResult: (data) =>
    ipcRenderer.invoke(MESSAGE_CHANNEL_FOR_RENDER_MAIN, data),
  // 3.监听主进程消息
  onNoticeReceiveFromMain: (callback) =>
    ipcRenderer.on(MESSAGE_FROM_MAIN_TO_RENDER, callback),
});
