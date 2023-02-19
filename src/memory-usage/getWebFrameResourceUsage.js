const { webFrame } = require("electron");

function getMemory(selector) {
  let tableStr = `
      <table 
        border="0" 
        width="100%" 
        cellspacing="1" 
	      cellpadding="4"
	      bgcolor="#cccccc"
      >
        <tr>
            <th>object</th>
            <th>count</th>
            <th>size</th>
            <th>liveSize</th>
        </tr>
    `;

  function logMemDetails(x) {
    function toMb(bytes) {
      return (bytes / (1000.0 * 1000)).toFixed(2);
    }
    return `
        <tr>
          <td>${x[0]}</td>
          <td>${x[1].count}</td>
          <td>${toMb(x[1].size) + "MB"}</td>
          <td>${toMb(x[1].liveSize) + "MB"}</td>
        </tr>
      `;
  }
  Object.entries(webFrame.getResourceUsage()).forEach((x) => {
    tableStr = tableStr + logMemDetails(x);
  });
  tableStr = tableStr + "</table>";

  const element = document.getElementById(selector || "memory");
  if (element) element.innerHTML = tableStr;
}

const getWebFrameResourceUsage = (selector) => {
  setInterval(() => getMemory(selector), 1000);
};

module.exports = getWebFrameResourceUsage;
