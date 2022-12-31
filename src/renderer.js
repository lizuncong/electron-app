const btn = document.getElementById("btn");
// const renderToMain = document.getElementById('renderToMain')
// const both = document.getElementById('both')
// const counter = document.getElementById('counter')

btn.onclick = () => {
  electronApi.sendMessageToMain({
    topic: "new-browser-window",
    body: {
      config: {
        width: 500,
        height: 500,
      },
      url: 'http://localhost:3000/connect'
    },
  });
};

// renderToMain.onclick = () => {
//     electronApi.sendMessageToMain({
//         topic: '单向通信测试：渲染进程到主进程',
//         body: {
//             count: 0
//         }
//     })
// }

// both.onclick = async () => {
//     const res = await electronApi.sendMessageToMainWithResult({
//         topic: '双向通信测试：渲染进程到主进程',
//         body: {
//             count: 1
//         }
//     })
//     console.log('双向通信测试。。', res)
// }

// electronApi.onNoticeReceiveFromMain((event, data) => {
//     const value = data.body.value
//     const oldValue = Number(counter.innerText)
//     const newValue = oldValue + value
//     counter.innerText = newValue
//     event.sender.send('message-from-render-to-main', { topic: '监听主进程消息', body: {} })
// })
