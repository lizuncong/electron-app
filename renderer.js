/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { BrowserWindow, getCurrentWindow } = require("@electron/remote")

let win = getCurrentWindow();

// const setIgnoreMouseEvents = (pointertyp) => event => {
//     // alert(pointertyp)
//     if('pointerdown' === pointertyp){
//         // alert('window pointer down')
//     }
//     let flag = event.target === document.documentElement;
//     // 如果event target是document，则允许事件穿透过去
//     if (flag) {
//         win.setIgnoreMouseEvents(true, { forward: true });
//     }
//     else {
//         win.setIgnoreMouseEvents(false);
//     }
// }
// window.addEventListener("pointermove", setIgnoreMouseEvents('pointermove'));
// window.addEventListener("pointerup", () => {
//     // alert('pointerup')
//     win.setIgnoreMouseEvents(true, { forward: true });
// });
// window.addEventListener("pointerdown", setIgnoreMouseEvents('pointerdown'));
// window.addEventListener("touchstart", (event) => {
//     alert(event.target === document.documentElement)
//     if (event.target === document.documentElement) {
//         win.setIgnoreMouseEvents(true, {forward: true})  
//     } else{
//         win.setIgnoreMouseEvents(false)
//     }
// });
// window.addEventListener("pointerdown", event => {
//     // alert('pointerdown')
//     if (event.target === document.documentElement) {
//         win.setIgnoreMouseEvents(true, { forward: true })
//     } else {
//         win.setIgnoreMouseEvents(false)
//     }
// });

window.addEventListener('pointermove', event => {
    if (event.target === document.documentElement) {
        win.setIgnoreMouseEvents(true, { forward: true })
    } else {
        win.setIgnoreMouseEvents(false)
    }
})
window.addEventListener('touchstart', event => {
    alert('touchstart')
    // alert(event.target === document.documentElement)
    if (event.target === document.documentElement) {
        win.setIgnoreMouseEvents(true, { forward: true })
    } else {
        win.setIgnoreMouseEvents(false)
    }
})
window.addEventListener('touchend', event => {
    alert('end')
    setTimeout(() => {
        win.setIgnoreMouseEvents(true, { forward: true })
    }, 0);

})
win.setIgnoreMouseEvents(true, { forward: true });



const left = document.getElementById('left')

left.onpointerdown = () => {
    // alert('hello left')
    left.innerHTML = Number(left.innerHTML) + 1
}


const right = document.getElementById('right')

right.onpointerdown = (e) => {
    // e.stopPropagation()
    right.innerHTML = Number(right.innerHTML) + 1
    // alert(right.innerHTML)
}


// const float = document.getElementById('float')

// let x = 500;
// let y = 50;
// const gapWidth = 10;
// const itemWidth = 200
// const itemHeight = 80
// const clientWidth = document.documentElement.clientWidth;
// const clientHeight = document.documentElement.clientHeight;

// float.style.left = `${clientWidth - itemWidth - gapWidth}px`;
// float.style.top = `${clientHeight*0.8}px`;

// float.onpointerdown = (e) => {
//     e.preventDefault();
//     float.style.transition = 'none'
// }

// float.onpointerup = (e) => {
//     float.style.transition = 'all 0.3s';
//     if (x > clientWidth/2) {
//         x = clientWidth - itemWidth - gapWidth;
//     } else {
//         x = gapWidth;
//     }
//     float.style.left = `${x}px`;

// }

// float.onpointermove = (e) => {
//     x = e.clientX - itemWidth/2;
//     y = e.clientY - itemHeight/2;
//     float.style.left = `${x}px`;
//     float.style.top = `${y}px`;

// }