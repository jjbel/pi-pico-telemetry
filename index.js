let state = new State();

const socket = new WebSocket("ws://localhost:8765");
socket.onopen = (event) => {
  console.log("opened websocket");
};
socket.onclose = (event) => {
  console.log("closed websocket");
};
socket.onmessage = (event) => {
  // if event.data is a Blob, use text(), which returns a Promise
  event.data.text().then((text) => {
    // console.log(text);
    state.parse(text);
    state.updateGraphs();
  });
};

console.log("start.");
