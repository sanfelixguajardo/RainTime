FROM python:3.9-slim
LABEL authors="sanfeps"

# create non priviledged user
RUN groupadd -r guest && useradd -r -g guest -m guest
RUN usermod -a -G dialout guest
# desable root login
RUN chsh -s /usr/sbin/nologin root

WORKDIR /usr/src/app

#ENV TZ=Europe/Madrid

RUN pip install aioamqp
RUN pip install asyncio
RUN pip install schedule
RUN pip install pyserial
RUN pip install python-dotenv

COPY ./MQ_Serial_waterer.py ./
COPY ./main.py ./

USER guest

CMD ["python","-u","./main.py"]