const mongoose = require("mongoose");
const { Schema } = mongoose;

// modelo de la coleccion usuarios
const usuarios = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    imagen: {type: String},
    profesion: {type: String},
    email: { type: String },
    contraseña: { type: String },
    historial: { type: Array, default: [] },
    estado: { type: String },
    rol: { type: String },
    verificacion: { type: String },
}, {
    timestamps: true
});

module.exports = mongoose.model("usuarios", usuarios, "usuarios");