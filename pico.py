from machine import UART, Pin
from time import sleep

uart1 = UART(1, baudrate=115200, tx=Pin(4), rx=Pin(5), timeout=1000)
i = 0

data = []

with open('/sample_data_trimmed2.csv', 'r') as file:
    data = file.read().splitlines()

while True:
    out = data[i] + '\n'
    uart1.write(out)
    print(out)
    sleep(0.1)
    i += 1
