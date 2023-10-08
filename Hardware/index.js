var express = require('express');
var app = express();
const port1 = 4000;
var temperatureData = 0;

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM7', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));
parser.on('data', (temp) => {
    console.log(temp);
    temperatureData = temp;
    app.get('/', (req, res) => {
        res.send(temperatureData)
    })
});

app.listen(port1, () => {
    console.log(`Example app listening at http://localhost:${port1}`)
})