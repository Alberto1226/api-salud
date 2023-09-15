const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const series = new Schema({
    titulo: { type: String },
    categorias: { type: Array, default: [] },
    actores: { type: String },
    director: { type: String },
    duracion: { type: String },
    sinopsis: { type: String },
    calificacion: { type: String },
    datosTemporada: { type: Array, default: [] },
    año: { type: String },
    disponibilidad: { type: String },
    masVisto: { type: String },
    header: { type: String },
    recomendado: { type: String },
    urlPortada: { type: String },
    urlTrailer: { type: String },
    contador: { type: String },
    seccion: { type: String },
    estado: { type: String },
    patrocinador: {type: String},
    patrocinadorPortada: {type: String},
    urlPortadaMovil: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("series", series, "series");