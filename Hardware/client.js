const http = require('http');
const mongoose = require('mongoose');
var plotly = require('plotly')("cikky1317", "9EAjDFbz01Ro1yOcPmXl")
const mqtt = require('mqtt')
const port = 3000;
var testValue = 0;
var val = 100;
const Sensor = require('./models/sensor.js');
const sensordata = {
    id: 0,
    name: "lightIntensitySensor",
    lightIntensity: 20
}
var data = {
    x: [],
    y: [],
    type: "scatter"
};

setInterval(loadtest, 2000); //time is in ms
function loadtest() {
    starttime = Date.now();
    mongoose.connect('mongodb+srv://cikkychen:20010118ASDLKj@sit314.mnurn.mongodb.net/data');

    http.get('http://localhost:4000', (res) => {
        res.on('data', function(chunk) {
            //console.log('' + chunk);
            testValue = chunk;
        });
    });
    val = ('' + testValue);
    //console.log(val);
    sensordata.lightIntensity = val;
    const jsonString = JSON.stringify(sensordata);
    console.log(jsonString);

    const newSensor = new Sensor({
        id: sensordata.id,
        name: sensordata.name,
        lightIntensity: sensordata.lightIntensity
    });

    newSensor.save().then(doc => {
        console.log(doc);
    }).then(() => {
        endtime = Date.now();
        time = endtime - starttime;
        data.x.push((new Date()).toISOString());
        data.y.push(val);
        var graphOptions = {
            filename: "iot-performance",
            fileopt: "overwrite"
        };
        plotly.plot(data, graphOptions, function(err, msg) {
            if (err) return console.log(err);
            console.log(msg);
        });
        mongoose.connection.close();
    });

    ledPublish(001, 'led1', parseInt(val));
    ledPublish(002, 'led2', parseInt(val) + 100);
    ledPublish(003, 'led3', parseInt(val) + 50);
    ledPublish(004, 'led4', parseInt(val) + 150);


}

function ledPublish(id, name, intensity) {
    const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
    client.on('connect', () => {
        var topic = "led/id/name/intensity";
        var message = String(intensity);
        client.publish(topic, message);
        console.log("id: " + id + " has named" + name + "has published on topic" + topic + " with intensity: " + message);
    });
    console.log("All topics connected for id: " + id);
};