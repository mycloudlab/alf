FROM node:8-alpine
RUN mkdir /app
ADD . /app
WORKDIR /app


ENV LOG_LEVEL info

ENV WIT_AI_TOKEN ""

ENV MQTT_BROKER mqtt://localhost:1883
ENV MQTT_USERNAME ""
ENV MQTT_PASSWORD ""

RUN yarn 

CMD node index.js