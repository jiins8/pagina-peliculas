const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const actorSchema = new mongoose.Schema({
    Nombre: String,
    Edad: String,
    Altura: String,
    Nacionalidad: String,
    Foto: String,
    id_pelicula: mongoose.Schema.Types.ObjectId


});
const Actor = mongoose.model('Actor', actorSchema)
module.exports = Actor