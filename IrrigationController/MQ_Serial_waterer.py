# This script connects to RabbitMQ to communicate with the server to obtain the new active program
# and to send a notification when its watering

import aioamqp
import asyncio
import schedule
import json
import serial
from datetime import datetime, time

class MQ_Serial_Waterer:
    def __init__(self, optionsMQ, queueMQ, serialPort):
        self.queue = queueMQ
        self.options = optionsMQ
        self.port = serialPort
        self.serialConnection = {}
        self.channel = {}

        self.program = {}
        self.has_changed = False

    def close_serial_connection(self):
        try:
            self.serialConnection.close()
            print("Serial connection closed")
        except serial.SerialException as e:
            print(f"Error when closing the connection: {e}")

    async def connect(self):
        try:
            # connect to arduino through serial
            self.serialConnection = serial.Serial(self.port, 9600)
            # establish connection with rabbitMQ
            self.transport, self.protocol = await aioamqp.connect(**self.options)

            self.channel = await self.protocol.channel()
            await self.channel.queue_declare(queue_name=self.queue, durable=False)

            await self.channel.basic_consume(self.callback, queue_name=self.queue)

            print("OK")

        except (aioamqp.AioamqpException, serial.SerialException) as e:
            print(f"Error trying to connect: {e}")
            return

    async def callback(self, channel, body, envelope, properties):
        msg_str = body.decode('utf-8')

        try:
            msg_json = json.loads(msg_str)
            self.program = msg_json
            self.has_changed = True
            print("msg JSON:", msg_json)

        except json.JSONDecodeError as e:
            print("Error trying to decode JSON:", e)

        await channel.basic_client_ack(envelope.delivery_tag)

    def send_comand(self, command):
        try:
            self.serialConnection.write(command.encode())
            print(f"Sent command: {command}")
            return True
        except serial.SerialException as e:
            print(f"Error sending command: {e}")
            return False

    def get_response(self):
        try:
            response = self.serialConnection.readline().decode().strip()
            return response
        except serial.SerialException as e:
            print(f"Error when reading the response: {e}")
            return None

    async def start_consuming(self):
        while True:
            try:
                await self.channel.basic_get(self.queue)
            except aioamqp.EmptyQueue:
                await asyncio.sleep(1)

    async def check_and_water(self):
        while True:
            if self.has_changed:
                schedule.clear()
                self.program = json.loads(self.program)

                if not self.program:
                    schedule.clear()
                    self.stop()
                    self.has_changed = False
                    continue

                print(self.program["wateringDays"])
                for day in self.program["wateringDays"]:
                    if day["selected"]:
                        self.schedule_day(day["day"], self.program["hour"], self.program["duration"])
                        print(day["day"])
                        self.has_changed = False

                print(schedule.get_jobs())

            schedule.run_pending()
            await asyncio.sleep(1)

    def schedule_day(self, day, hour, duration):
        if day == 'L':
            schedule.every().monday.at(hour).do(self.water, duration)
        elif day == 'M':
            schedule.every().tuesday.at(hour).do(self.water, duration)
        elif day == 'X':
            schedule.every().wednesday.at(hour).do(self.water, duration)
        elif day == 'J':
            schedule.every().thursday.at(hour).do(self.water, duration)
        elif day == 'V':
            schedule.every().friday.at(hour).do(self.water, duration)
        elif day == 'S':
            schedule.every().saturday.at(hour).do(self.water, duration)
        elif day == 'D':
            schedule.every().sunday.at(hour).do(self.water, duration)

    def water(self, duration):
        self.send_comand(f"water:{duration}")
        print(self.get_response())

    def stop(self):
        self.send_comand(f"stop:0")
        print(self.get_response())