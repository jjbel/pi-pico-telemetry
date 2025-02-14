from websockets.sync.server import serve
from datetime import datetime
from time import sleep

def handler(websocket):
    while True:
        out = str(datetime.now())
        websocket.send(out)
        print(out)
        sleep(.1)

def main():
    with serve(handler, "localhost", 8765) as server:
        server.serve_forever()

if __name__ == "__main__":
    main()
