const mongoose = require('mongoose');

const partieSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    joueur_1: { type: Number , required: true },
    joueur_2: { type: Number , required: true },
    etat: { type: Number , default: "en cours" },

});

module.exports = mongoose.model('partie', partieSchema);