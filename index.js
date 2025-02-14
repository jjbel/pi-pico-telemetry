const socket = new WebSocket("ws://localhost:8765")
socket.onopen = event => {
    console.log("opened websocket")
}
socket.onclose = event => {
    console.log("closed websocket")
}
socket.onmessage = event => {
    console.log("received", event.data)
}

console.log("start.")
