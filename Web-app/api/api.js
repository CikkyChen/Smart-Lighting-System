const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cikkychen:20010118ASDLKj@chenzey.yr56pnh.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express');
const Device = require('./models/device');
const Light = require('./models/light');

const app = express();

const bodyParser = require('body-parser');
const { $where } = require('./models/device');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 5000;

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    return err
      ? res.send(err)
      : res.send(devices);
  });
});

app.post('/api/devices', (req, res) => {
  const { light_id, light_name, floor_num, _Date } = req.body;
  const newDevice = new Device({
    light_id, light_name, floor_num, _Date
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send("Sucessful");
  });
});

app.get('/api/light', (req, res) => {
  Light.find({}, (err, devices) => {
    return err
      ? res.send(err)
      : res.send(devices);
  });
});

app.post('/api/light', (req, res) => {
  const { light_id, colour, floor } = req.body;
  const newLight = new Light({
    light_id, colour, floor
  });
  newLight.save(err => {
    return err
      ? res.send(err)
      : res.send("Sucessful");
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});