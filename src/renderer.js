const btn = document.getElementById("btn");


btn.onclick = () => {
  electronApi.sendMessageToMain({
    topic: "new-browser-window",
    body: {
      config: {
        width: 500,
        height: 500,
      },
      url: 'http://localhost:3000'
    },
  });
};