const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
var createError = require('http-errors');

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
        }
    }
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use('/', require('./router/guest.js'));
app.use('/admin', require('./router/admin.js'));
app.use('/student', require('./router/student.js'));
app.use('/lecturer', require('./router/lecturer.js'));

app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = err;

    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => console.log(`http://localhost:${port} is running!`));