const { contextBridge, ipcRenderer } = require("electron");
const { webFrame } = require("electron");

// const getProcessMemoryUsage = require("./getProcessMemoryUsage");

// const getWebFrameResourceUsage = require("./getWebFrameResourceUsage");

// window.addEventListener("DOMContentLoaded", () => {
//   getProcessMemoryUsage("processmemoryusage");
//   getWebFrameResourceUsage("webframeresourceusage");

//   setTimeout(() => {
//     const processpid = document.getElementById("processpid");
//     if (processpid) processpid.innerHTML = `渲染进程id：${process.pid}`;

//     ipcRenderer.invoke("get-main-process-id").then((res) => {
//       const mainprocessid = document.getElementById("mainprocessid");
//       if (mainprocessid)
//         mainprocessid.innerHTML = `electron主进程id：${res.pid}`;
//     });
//   }, 1000);
//   setTimeout(() => {
//     const btn = document.getElementById("clearwebframe");
//     btn &&
//       btn.addEventListener("click", (e) => {
//         webFrame.clearCache();
//         console.log("CLEARED");
//       });

//     const openBtn = document.getElementById("newbrowserwindow");
//     openBtn &&
//       openBtn.addEventListener("click", (e) => {
//         ipcRenderer.send("open-window");
//       });
//   }, 2000);
// });
