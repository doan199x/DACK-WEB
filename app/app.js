const express = require('express');
const exphbs = require('express-handlebars');
var createError = require('http-errors');
require('dotenv').config()

const app = express();
const port = 3000;
//Middlewares
require('./middleware/view.mdw');
require('./middleware/session.mdw');
require('./middleware/locals.mdw');
require('./middleware/routes.mdw');
require('./middleware/error.mdw');

require('express-async-errors');
app.use(express.urlencoded({
  extended: true
}));

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
        },
        money: (number) => {
            var formattedValue = new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(number);
            return formattedValue;
        }
    },
    partialsDir: [

        __dirname + '/views/partials',
    ]
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//use session
let session = require('express-session');
app.use(session({
    cookie: { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: 's3cret',
    resave: false,
    saveUninitialized: false
}));

//body-parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routers/guest'));
app.use('/student', require('./routers/student'));
app.use('/login', require('./routers/login'));
app.use('/admin', require('./routers/admin'));
app.use('/login', require('./routers/login'));
app.use('/signup', require('./routers/signup'));

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