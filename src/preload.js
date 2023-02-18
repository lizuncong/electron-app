const { webFrame } = require("electron");
const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  function getMemory() {
    // `format` omitted  (pads + limits to 15 characters for the output)
    function format(text) {
      return String(text).padStart(15, " ");
    }
    let str = `${format("object")}, ${format("count")}, ${format(
      "size"
    )}, ${format("liveSize")}\n`;
    function logMemDetails(x) {
      function toMb(bytes) {
        return (bytes / (1000.0 * 1000)).toFixed(2);
      }

      //   console.log(
      //     format(x[0]),
      //     format(x[1].count),
      //     format(toMb(x[1].size) + "MB"),
      //     format(toMb(x[1].liveSize) + "MB")
      //   );
      return `${format(x[0])}, ${format(x[1].count)}, ${format(
        toMb(x[1].size) + "MB"
      )}, ${format(toMb(x[1].liveSize) + "MB")}\n`;
    }

    // console.log(
    //   format("object"),
    //   format("count"),
    //   format("size"),
    //   format("liveSize")
    // );
    Object.entries(webFrame.getResourceUsage()).forEach((x) => {
      str = str + logMemDetails(x);
    });
    // Object.entries(webFrame.getResourceUsage()).map(logMemDetails);
    console.log("------", str);
    replaceText("memory", str);
  }

  setInterval(getMemory, 1000);

  setTimeout(() => {
    const btn = document.getElementById("clear");
    btn.addEventListener("click", (e) => {
      webFrame.clearCache();
      console.log("CLEARED");
    });

    const openBtn = document.getElementById("open");
    openBtn.addEventListener("click", (e) => {
     ipcRenderer.send('open-window')
    });
  }, 2000);
});
