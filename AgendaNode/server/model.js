const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/agenda');

let UsuarioSchema = new Schema({
    id:{ type: Number, require: true, unique: true },
    correo:{ type: String, require: true },
    clave:{ type: String, require: true },
    nombre_completo:{ type: String, require: true },
    fecha_nacimiento:{ type: String, require: true }
});
let UsuarioModel = mongoose.model('Usuario', UsuarioSchema);


let EventoSchema = new Schema({
    id:{ type: Number, unique:true },
    titulo:{ type: String },
    fecha_inicio:{ type: String },
    fecha_fin:{ type: String},
    es_dia_completo:{ type: Boolean, enum: [true, false] },
    id_usuario:{ type: Number }
});
let EventoModel = mongoose.model('Evento', EventoSchema);

module.exports = {
    UsuarioModel: UsuarioModel,
    EventoModel: EventoModel
};