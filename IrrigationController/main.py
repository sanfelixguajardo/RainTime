# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.
import asyncio
import os
import time
from MQ_Serial_waterer import MQ_Serial_Waterer
from dotenv import load_dotenv


async def main():
    load_dotenv()

    # Access environment variables
    port = os.getenv("RABBITMQ_PORT")
    user = os.getenv("RABBITMQ_USER")
    password = os.getenv("RABBITMQ_PASSWORD")
    timezone = os.getenv('TZ', 'UTC')

    # Set the timezone
    os.environ['TZ'] = timezone
    time.tzset()

    options = {
        'host': 'rabbitmq',
        'port': port,
        'login': user,
        'password': password,
        'virtual_host': '/',
    }


    waterer = MQ_Serial_Waterer(options, 'program.active', "/dev/ttyACM0")
    await waterer.connect()
    await asyncio.gather(
        waterer.start_consuming(),
        waterer.check_and_water()
    )


if __name__ == '__main__':
    asyncio.run(main())