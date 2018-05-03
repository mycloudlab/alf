var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost')

client.on('connect', function () {
    client.subscribe('output')
})

// listen output 
client.on('message', function (topic, message) {
    console.log("bot",topic,":",message.toString())
})

process.on('exit', function () {
    client.end()
    console.log('Até mais!!!');
});


console.log("diga algo:")
var stdin = process.openStdin();
stdin.addListener("data", function (d) {
    console.log('enviando >>',d.toString().trim())
    client.publish('input', d.toString().trim());
});