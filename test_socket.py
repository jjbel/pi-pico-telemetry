# open a websocket locally instead of on the pico
# send the test CSV data line-by-line

from websockets.sync.server import serve
from pathlib import Path
from time import sleep

test_data = Path("test_data.csv").read_text().splitlines()

i = 0
data_len = len(test_data)

def handler(websocket):
    print("socket opened")
    global i
    while True:
        out = test_data[i % data_len]
        websocket.send(bytes(out, "utf-8")) # index.js socket.onmessage handler expects Blob, ie bytes
        # print(out)

        # sleep for a short time to simulate delay
        sleep(0.5)
        i += 1

if __name__ == "__main__":
    with serve(handler, "localhost", 8765) as server:
        server.serve_forever()
