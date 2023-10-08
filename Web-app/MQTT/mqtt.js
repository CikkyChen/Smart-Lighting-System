const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

const port = 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// initialize the MQTT client
var client = mqtt.connect("mqtt://broker.hivemq.com:1883");

client.on('connect', () => {
    console.log('mqtt connected');
});

app.post('/send-command', (req, res) => {
    const { deviceId, command } = req.body;
    const topic = `myid/command/light/${deviceId}`;
    client.publish(topic, command, () => {
        res.send('published new message');
    });
});

app.post('/send-command1', (req, res) => {
    const { deviceId1, command1 } = req.body;
    const topic = `myid/command/floor/${deviceId1}`;
    client.publish(topic, command1, () => {
        res.send('published new message');
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});