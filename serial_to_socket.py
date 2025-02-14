#!/usr/bin/env python

from websockets.sync.server import serve

from serial import Serial
from time import sleep

ser = Serial("/dev/ttyAMA0", 115200, timeout=1)

def handler(websocket):
    while True:
        # TODO directly read serial? or needs manual caching?
        out = ser.readline()
        
        websocket.send(out)
        print(out)

def main():
    with serve(handler, "localhost", 8765) as server:
        server.serve_forever()

if __name__ == "__main__":
    main()
