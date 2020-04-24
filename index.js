// express app
const express = require('express');
const app = express();

// middleware
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', (path.join(__dirname, 'views')));
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

// model
// contains database config
const db = require('./db');

// ROUTES
app.get('/', (req, res) => {
    res.render('ajax-playground');
})

app.get('/get', (request, response) => {

    const data = {
        1: "bacon",
        2: "mango"
    };

    response.send(data);
});


// start server listen
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

let shutdown = function() {
    server.close(() => {
        console.log('Process terminated');
        db.poolEnd();
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);