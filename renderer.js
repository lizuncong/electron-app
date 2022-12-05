/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { BrowserWindow, getCurrentWindow } = require("@electron/remote")

let win = getCurrentWindow();
window.addEventListener("mousemove", event => {
    let flag = event.target === document.documentElement;
    // 如果event target是document，则允许事件穿透过去
    if (flag) {
        win.setIgnoreMouseEvents(true, { forward: true });
    }
    else {
        win.setIgnoreMouseEvents(false);
    }
});
win.setIgnoreMouseEvents(true, { forward: true });



const left = document.getElementById('left')

left.onclick = () => {
    alert('hello left')
}


const right = document.getElementById('right')

right.onclick = () => {
    alert('hello right')
}