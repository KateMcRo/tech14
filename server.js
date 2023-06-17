const express = require('express')
const controllers = require('./controllers')
const { engine } = require('express-handlebars')

const app = express()

const PORT = 3001

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(controllers)

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})