const mongoose = require('mongoose');
module.exports = mongoose.model('LightIntensity', new mongoose.Schema({
    id: String,
    name: String,
    Managername: String,
    time: String,
    lightIntensity: Number
}));