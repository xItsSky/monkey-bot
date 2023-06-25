FROM node:18.16.0

RUN apt update
RUN apt install -y ffmpeg
RUN npm install -g npm@9.6.6
RUN npm install -g env-cmd

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

VOLUME /usr/src/bot/resources/saves

CMD ["npm", "run", "start"]
