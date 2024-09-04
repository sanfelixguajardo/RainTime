FROM node:20-slim
LABEL authors="sanfeps"

# create non priviledged user
RUN groupadd -r guest && useradd -r -g guest -m guest
# desable root login
RUN chsh -s /usr/sbin/nologin root

WORKDIR /usr/src/app

# create log file and change mods
RUN touch access.log && chmod 777 access.log

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

USER guest

EXPOSE 3500

CMD [ "npm", "run", "start" ]

