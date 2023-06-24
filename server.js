const express = require('express')
const controllers = require('./controllers')
const { engine } = require('express-handlebars')
const connection = require('./config/connection')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
require('dotenv').config();

const app = express()
const PORT = 3001

const sessionStore = new SequelizeStore({
    db: connection,
});


app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            secure: false,
            maxAge: 864000000,
        },
    })
);

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(controllers)


app.listen(PORT, async() => {
    console.log(`Listening on PORT ${PORT}`)
    await connection.sync({ force: false});
    console.log("Models synced")
    
})