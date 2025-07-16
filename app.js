var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sqlite3 = require('sqlite3');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
var db = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: 'db_project.db'
        }
    }
);


 */




const mongoose = require('mongoose');
const Pelicula = require('./models/peliculas')
const Actor = require('./models/actors')
const {response} = require("express");
mongoose.connect('mongodb://127.0.0.1:27017/bd_peliculas_actores');

const dbMongoose = mongoose.connection;
dbMongoose.once('open', function () {
    console.log('OK')
})


app.get('/test', async (req, res) => {
    try {
        const filter = {}
        const peliculas = await Pelicula.find(filter)
        console.log(peliculas)
    } catch (e) {
        console.log(e)
    }
})

app.get('/test2', async (req, res) => {
    try {
        const filter = {}
        const actors = await Actor.find(filter)
        console.log(actors)
    } catch (e) {
        console.log(e)
    }
})
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// RUTAS PELICULAS
/*
app.get('/api/peliculas', function (req, res) {
    db.select('p.id', 'p.Pelicula', 'p.Genero', 'p.Director', 'p.Fecha_Estreno', 'p.Duracion', 'p.Portada', 'p.id_actor')
        .from('peliculas as p')
        .then(function (data) {
            data = {peliculas: data}
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    })
});

 */



app.get('/api/peliculas/', async (req, res) => {
    let filter = {}
    try {
        const peliculas = await Pelicula.find(filter)
        res.json({'peliculas': peliculas});
    } catch (error) {
        console.error("Error: ", error.message);
        res.send(error)
    }
});


// RUTAS ACTORES
/*
app.get('/api/actores', function (req, res) {
    db.select('a.id', 'a.Nombre', 'a.Edad', 'a.Altura', 'a.Nacionalidad', 'a.Foto', 'a.id_pelicula')
        .from('actores as a')
        .then(function (data) {
            data = {actores: data}
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    })
});

 */

app.get('/api/actores/', async (req, res) => {
    let filter = {}
    try {
        const actores = await Actor.find(filter)
        res.json({'actores': actores});
    } catch (error) {
        console.error("Error: ", error.message);
        res.send(error)
    }
});

// AÑADIR PELICULA
/*
app.post('/api/peliculas', function (req, res) {
    let data_form = req.body;
    console.log('app.je', data_form)

    db.insert(data_form)
        .into('peliculas')
        .then(function (data) {

            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
 */
app.post('/api/peliculas/', function (req, res) {
    let data_form = req.body;
    console.log('app.je', data_form)

    Pelicula.create(data_form)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            console.log(error)
        });
});

//AÑADIR ACTORES
/*
app.post('/api/actores', function (req, res) {
    let data_form = req.body;
    console.log('app.je', data_form)

    db.insert(data_form)
        .into('actores')
        .then(function (data) {

            res.json(data);
        }).catch(function (error) {
        console.log(error)
    });
});
*/
app.post('/api/actores/', function (req, res) {
    let data_form = req.body;
    console.log('app.je', data_form)

    Actor.create(data_form)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            console.log(error)
        });
});

// RUTAS PELICULAS POR ID
/*
app.get('/api/peliculas/:id', function (req, res) {
    let id = parseInt(req.params.id);
    db.select('p.id', 'p.Pelicula', 'p.Genero', 'p.Director', 'p.Fecha_Estreno', 'p.Duracion', 'p.Portada', 'a.id_pelicula', 'a.Nombre')
        .from('peliculas as p')
        .leftJoin('actores as a', 'a.id_pelicula', 'p.id')
        .where('p.id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    })
});
*/

app.get('/api/peliculas/:id', function (req, res) {
    let id = req.params.id;
    Pelicula.find({_id: id})
        .exec()
        .then(function (data) {
            res.json(data[0]);
        })
        .catch(function (error) {
            console.log(error);
        });
});

// RUTAS ACTORES POR ID
/*
app.get('/api/actores/:id', function (req, res) {
    let id = parseInt(req.params.id);
    db.select('a.id', 'a.Nombre', 'a.Edad', 'a.Altura', 'a.Nacionalidad', 'a.Foto', 'a.id_pelicula', 'p.Pelicula',)
        .from('Actores as a')
        .join('peliculas as p',  "p.id", "a.id_pelicula")
        .groupBy('p.Pelicula')
        .where('a.id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    })
});
*/
app.get('/api/actores/:id', function (req, res){
    let id = req.params.id;
    Actor.find({_id: id})
        .exec()
        .then(function(data){
            res.json(data[0]);
        })
        .catch(function (error){
            console.log(error);
        });
});

//MODIFICAR PELICULA
/*
app.post('/api/peliculas/:id', function (req, res){
    let id = req.params.id;
    let peliculasData = req.body;
    db('peliculas')
        .update(peliculasData)
        .where('id', id)
        .then(function (data){
            res.json(data)
        }).catch(function (error){
        console.log(error)
    })
})
*/
app.post('/api/peliculas/:id', function (req, res){
    let id = req.params.id;
    let peliculasData = req.body;

    Pelicula.findOneAndUpdate({ _id: id }, peliculasData, { new: true })
        .then(function (data){
            res.json(data);
        })
        .catch(function (error){
            console.log(error);
        });
});

//MODIFICAR ACTORES
/*
app.post('/api/actores/:id', function (req, res){
    let id = req.params.id;
    let actoresData = req.body;
    db('actores')
        .update(actoresData)
        .where('id', id)
        .then(function (data){
            res.json(data)
        }).catch(function (error){
        console.log(error)
    })
})
*/
app.post('/api/actores/:id', function (req, res) {
    let id = req.params.id;
    let actoresData = req.body;

    Actor.findOneAndUpdate({ _id: id }, actoresData, { new: true })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            console.log(error)
        });
});

// DELETE PELICULA
/*

app.delete('/api/peliculas/:id', function (req, res) {
    let id = parseInt(req.params.id);
    db.delete()
        .from('peliculas')
        .where('id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    })
});
*/
app.delete('/api/peliculas/:id', function (req, res) {
    let id = req.params.id;

    Pelicula.deleteOne({ _id: id })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            console.log(error)
        });
});

//DELETE ACTORES
/*
app.delete('/api/actores/:id', function (req, res) {
    let id = parseInt(req.params.id);
    db.delete()
        .from('actores')
        .where('id', id)
        .then(function (data) {
            res.json(data);
        }).catch(function (error) {
        console.log(error)
    })
});
 */
app.delete('/api/actores/:id', function (req, res) {
    let id = req.params.id;

    Actor.deleteOne({ _id: id })
        .then(function (data) {
            res.json(data);
        })
        .catch(function (error) {
            console.log(error)
        });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
