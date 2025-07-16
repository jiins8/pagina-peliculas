const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const peliculaSchema = new mongoose.Schema({
    Pelicula: String,
    Genero: String,
    Director: String,
    Duracion: String,
    Fecha_Estreno: String,
    Portada: String,
    id_actor: mongoose.Schema.Types.ObjectId


});
const Pelicula = mongoose.model('Pelicula', peliculaSchema)
module.exports = Pelicula