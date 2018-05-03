// dependencies
const winston = require('winston');
const mqtt = require('mqtt')

// environment constants
const token = process.env.TOKEN;
const broker = process.env.MQTT_BROKER || 'mqtt://localhost';

// docker logging all in console
const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

// agent program 

var agentId='boas_vindas'
var client = mqtt.connect(broker);

client.on('connect', () => {
    logger.info(`agent [${agentId}] is connected.`);
    client.subscribe(agentId);

    client.on('message', (topic, message) => {
        logger.debug(`message received topic: ${topic}, message: ${message}`);
        client.publish('output', 'bem vindo');
    });
});

