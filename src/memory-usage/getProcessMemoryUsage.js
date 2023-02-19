function getRSS(selector) {
  let tableStr = `
      <table 
        border="0" 
        width="100%" 
        cellspacing="1" 
	      cellpadding="4"
	      bgcolor="#cccccc"
      >
    `;

  function logBytes(x) {
    return `
        <tr>
          <td>${x[0]}</td>
          <td>${x[1] / (1000.0 * 1000)}MB</td>
        </tr>
      `;
  }

  Object.entries(process.memoryUsage()).forEach((x) => {
    tableStr = tableStr + logBytes(x);
  });

  const element = document.getElementById(selector || "rss");
  if (element) element.innerHTML = tableStr;
}

const getProcessMemoryUsage = (selector) => {
  setInterval(() => getRSS(selector), 1000);
};

module.exports = getProcessMemoryUsage;
