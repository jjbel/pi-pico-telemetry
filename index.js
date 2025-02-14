const socket = new WebSocket("ws://localhost:8765")
socket.onopen = event => {
    console.log("opened websocket")
}
socket.onclose = event => {
    console.log("closed websocket")
}
socket.onmessage = event => {
    // event.data is a Blob, and text() returns a Promise
    event.data.text().then(text => {
        console.log(text)
    })
}

console.log("start.")
