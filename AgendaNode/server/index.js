const http = require('http'),
      path = require('path'),
      Routing = require('./rutas.js')
      express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      bcrypt = require('bcryptjs');

const PORT = 3265;
const app = express();

const Server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('client'));

app.use('/agenda', Routing.RouterAgenda);
app.use('/events', Routing.RouterEvents);

Server.listen(PORT, function(){
    console.log('El servidor para AgendaNode esta ejecutandose por el puerto: ' + PORT);
    crearUsuario("david@ortega.com","123456","David Ortega","2001/06/17");
})

function crearUsuario(correo, clave, nombre_completo, fecha_nacimiento){
    let User = require('./model.js').UsuarioModel;
    User.findOne({correo: correo}).exec((err, docs) => {
        if(docs == null){
            let usuario = new User({
                id: Math.floor(Math.random()*50),
                correo: correo,
                clave: bcrypt.hashSync(clave,10),
                nombre_completo: nombre_completo,
                fecha_nacimiento: fecha_nacimiento
            });
            usuario.save();
        }
    })
}