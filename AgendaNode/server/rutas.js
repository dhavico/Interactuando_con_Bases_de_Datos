const RouterAgenda = require('express').Router(),
      RouterEvents = require('express').Router(),
      bcrypt = require('bcryptjs');
const Users = require('./model.js').UsuarioModel
      Events = require('./model.js').EventoModel;

RouterAgenda.post('/login', function(req, res){
    Users.findOne({'correo': req.body.user}).exec(function(err, data){
        if(err) res.status(500).json(err);
        if(data){
            if(bcrypt.compareSync(req.body.pass, data.clave)){
                let user_session = {
                    id: data.id,
                    user: data.correo
                };
                res.status(200).json({data: user_session, msg: "OK"});
            }else{
                res.status(200).send({ msg: "Usuario y/o contraseña no validos."});
            }
        }else{
            res.status(200).send({ msg: "Usuario y/o contraseña no validos."});
        }
    });
    
});

RouterEvents.post('/all', function(req, res){
    Events.find({id_usuario: req.body.id}).exec(function(err, docs){
        if(err){
            res.status(500);
            res.json(err)
        }
        let events = [];
        docs.map((value) => {
            let event = {
                id: value.id,
                title: value.titulo,
                start: value.fecha_inicio,
                end: value.fecha_fin,
                allDay: value.es_dia_completo
            }
            events.push(event);
        })
        
        res.json(events);
    })
});

RouterEvents.post('/new', function(req, res){
    let event = new Events({
        id: Math.floor(Math.random()*50),
        titulo: req.body.title,
        fecha_inicio: req.body.start,
        fecha_fin: req.body.end,
        es_dia_completo: req.body.allDay,
        id_usuario: req.body.idUser
    });
    event.save(function(error){
        if(error){
            res.status(500);
            res.json(error);
        }
        res.send("Registro Guardado");
    })
});

RouterEvents.post('/delete/:id', function(req, res){
    Events.deleteOne({id: req.body.id}).exec(function(err, docs){
        if(err){
            res.status(500);
            res.json(err)
        }
        res.json("El evento fue eliminado correctamente.")
    })
});

RouterEvents.post('/update/:id', function(req, res){
    Events.findOne({id: req.body.evento.id}).exec(function(err, docs){
        if(err){
            res.status(500);
            res.json(err)
        }
        let evento = docs;

        evento.fecha_inicio = req.body.evento.start;
        evento.fecha_fin = req.body.evento.end;
        evento.save(function(err, doc){
            if(err){
                res.status(500);
                res.json(err)
            }
            res.json("El evento fue actualizado correctamente.");
        });
        
    })
});


module.exports = {
    RouterAgenda: RouterAgenda,
    RouterEvents: RouterEvents
};