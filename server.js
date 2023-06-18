const express = require('express')
const controllers = require('./controllers')
const { engine } = require('express-handlebars')
const connection = require('./config/connection')

const app = express()

const PORT = 3001

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.json())
app.use(controllers)



app.listen(PORT, async() => {
    console.log(`Listening on PORT ${PORT}`)
    await connection.sync({ force: false});
    console.log("Models synced")
    
})