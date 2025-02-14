from serial import Serial
from time import sleep

ser = Serial("/dev/ttyAMA0", 115200, timeout=1)

while True:
    print(ser.readline())
