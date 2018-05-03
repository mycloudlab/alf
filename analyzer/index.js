// dependencies
const winston = require('winston');
const mqtt = require('mqtt')
var request = require('request-promise');

// environment constants
const broker = process.env.MQTT_BROKER || 'mqtt://localhost:1883';
const logLevel = process.env.LOG_LEVEL || 'info';
const token = process.env.WIT_AI_TOKEN;
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;
const clientId = 'analyzer';

// docker logging all in console
const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

// analyzer program
var messageProcessors = {};
var client = mqtt.connect(broker, { clientId, username, password });

client.on('connect', () => {
    logger.info('analyzer is connected.');
    logger.debug(`token: ${token}`)

    client.subscribe('input')

    client.on('message', (topic, message) => {
        logger.debug(`message received: topic:${topic},message: ${message}`);

        if (messageProcessors[topic]) {
            messageProcessors[topic](message);
        } else {
            client.publish('output', 'sorry do not understand');
        }
    });
});

// process input user message
messageProcessors.input = (message) => {
    logger.debug(`process user input: ${message}`);
    let data = new Date().toISOString().split('T')[0].replace(/-/g, '');
    request({ uri: `https://api.wit.ai/message?v=${data}&q=${encodeURIComponent(message.toString())}`, headers: { 'Authorization': `Bearer ${token.toString()}` }, json: false })
        .then(function (understood) {

            logger.debug(`reply for wit.ai, ${understood}`);

            understood = JSON.parse(understood);

            if (!understood.entities.intent) {
                client.publish('output', 'sorry do not understand');
                logger.debug('sorry do not understand', understood);
                return
            }
            let agent = understood.entities.intent[0].value;
            let message = JSON.stringify(understood);

            logger.debug(`send message for agent: ${agent}: ${message}`);

            client.publish(agent, message);
        })
        .catch(function (err) {
            client.publish('output', 'error on call wit.ai');

            logger.error(`error on call wit.ai: ${err.toString()}`);
        });
}