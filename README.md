# Pi-Pico Telemetry

A telemetry server using
1. a Raspberry Pi Pico to receive data wirelessly from the rocket and
2. a regular Raspberry Pi to host the telemetry webpage, easily accessible from a phone

Made for the IIT-B Rocket Team's Ground Station.

> Why not use the pico only? the limited RAM and micropython restriction
>
> Why not use the pi only? the libraries for wireless communication are only on the
>
> We might switch to use one board exclusively in the future

## Pi-Pico communication

[Using: Medium - Tim Hanewich](https://timhanewich.medium.com/using-uart-between-a-raspberry-pi-pico-and-raspberry-pi-3b-raspbian-71095d1b259f)

### Wiring

Physical numbering vs GPIO numbering:
https://pinout.xyz/

GP UART pins:
- Pico
    - UART0: 0/1, 12/13, 16/17
    - UART1: 4/5, 8/9
- Pi: UART: 8/10

Connections:
1. Pi8(GP15) > Pico7(GP5)
1. Pico6(GP4) > Pi10(16)
1. Pi6(GND) > Pico3(GND)

UART shows up as file:
`/dev/ttyAMA0` [(from forum)](https://forums.raspberrypi.com/viewtopic.php?t=31141)


### Other Useful Links

[Geekculture Medium](https://medium.com/geekculture/serial-connection-between-raspberry-pi-and-raspberry-pico-d6c0ba97c7dc)

[How to enable Tx Rx pins on Pi](https://spellfoundry.com/2016/05/29/configuring-gpio-serial-port-raspbian-jessie-including-pi-3-4/)
