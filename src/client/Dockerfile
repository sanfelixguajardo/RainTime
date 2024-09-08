FROM node:20-slim
LABEL authors="sanfeps"

# create non priviledged user
RUN groupadd -r guest && useradd -r -g guest -m guest
# desable root login
RUN chsh -s /usr/sbin/nologin root

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cachessh

COPY . .

# set default user to guest
# USER guest

EXPOSE 3000

CMD [ "npm", "run", "start" ]

