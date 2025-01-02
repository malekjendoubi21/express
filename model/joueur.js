const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
    pseudo: { type: String, required: true },
    sante: { type: Number , default: 100 },
    score: { type: Number , default: 0 },

});

module.exports = mongoose.model('joueur', joueurSchema);