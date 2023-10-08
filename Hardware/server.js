const mqtt = require('mqtt')
const client = mqtt.connect("mqtt://broker.hivemq.com:1883");

var ledsDown = 0;

var topic = "led/id/name/intensity";
client.on('connect', () => {
    client.subscribe(topic);
    console.log('mqtt connected to');
});
client.on('message', (topic, message) => {
    console.log("Topic is: " + topic);
    console.log("Intensity is: " + message);
    if (parseInt(message) <= 100) {
        ledsDown++;
        console.log("ledsDown " + ledsDown);
    }

    if (ledsDown > 1) {
        console.log("More than two devices have less intensities than 100 nits");

    }
    ledsDown = 0;
});