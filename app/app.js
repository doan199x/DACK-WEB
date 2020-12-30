const express = require('express');
const exphbs = require('express-handlebars');
var createError = require('http-errors');

const app = express();
const port = 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        equal: function (a, b, options) {

            return (a == b) ? options.fn(this) : options.inverse(this);
        },
        time: (date, format) => {

            const moment = require('moment');
            return moment(date).format(format);
        },
        partial: (name) => {
            return name;
        }
    },
    partialsDir  : [

        __dirname + '/views/partials',
    ]
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

// app.use('/', require('./routers/home'));

app.use(function (req, res, next) {

    next(createError(404));
});
app.use(function (err, req, res, next) {

    res.status(err.status || 500);
    res.render('home', {
        layout: 'main',
        contain: 'error',
        message: err.message,
        status: err.status
    });
});

app.listen(port, () => console.log(`http://localhost:${port} is running!`));