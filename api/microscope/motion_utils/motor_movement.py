import asyncio
import RPi.GPIO as GPIO

motor_y_pins = [17, 18, 27, 22]
motor_z_pins = [23, 24, 25, 8]
motor_x_pins = [7, 11, 9, 10]
step_sequence = [[1, 0, 0, 1],
                 [1, 0, 0, 0],
                 [1, 1, 0, 0],
                 [0, 1, 0, 0],
                 [0, 1, 1, 0],
                 [0, 0, 1, 0],
                 [0, 0, 1, 1],
                 [0, 0, 0, 1]]
motor_pins = motor_y_pins + motor_z_pins + motor_x_pins
GPIO.setmode(GPIO.BCM)
for motor in motor_pins:
    GPIO.setup(motor, GPIO.OUT)
    GPIO.output(motor, GPIO.LOW)

async def move_motors(motor_pins, step, delay_time=0.002):
    motor_step_counter = 0
    while True:
        for pin in range(0, len(motor_pins)):
            GPIO.output(motor_pins[pin], step_sequence[motor_step_counter][pin])
        motor_step_counter = (motor_step_counter + step) % 8 
        await asyncio.sleep(delay_time)

async def main(axis, direction):
    print(axis, direction)
    step = 1 if direction == "cw" else -1
    match axis:
        case 'y':
            delay_time = 0.0009
            await move_motors(motor_y_pins, step, delay_time)
        case 'x':
            await move_motors(motor_x_pins, step)
        case 'z':
            await move_motors(motor_z_pins, step)

