// 主进程和渲染进程通信的消息类型
// 从渲染进程发消息到主进程
MESSAGE_FROM_RENDER_TO_MAIN = "message-from-render-to-main";
// 双向通信：监听渲染进程的消息，并返回结果给渲染进程
MESSAGE_CHANNEL_FOR_RENDER_MAIN = "message-channel-for-render-main";
// 主进程发消息给渲染进程
MESSAGE_FROM_MAIN_TO_RENDER = "message-from-main-to-render";

module.exports = {
  MESSAGE_FROM_RENDER_TO_MAIN,
  MESSAGE_CHANNEL_FOR_RENDER_MAIN,
  MESSAGE_FROM_MAIN_TO_RENDER,
};
