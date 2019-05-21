import 'dotenv/config'
import { models } from './models'
import routes from './routes'
import { connectDb } from './models'
import cors from 'cors'
import bodyParser from 'body-parser'
import createUsersWithMessages from './helpers/database'

import express  from 'express'
import session from 'express-session'
import http from 'http'

let app = express()
let server = http.Server(app)
var io = require('socket.io')(server)
var connections = []

io.on('connection', function(socket) {
    connections.push(socket)
    console.log('Connected: %s sockets connected', connections.length)
    // Disconnect
    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1)
        console.log('Diconnected: %s sockets connected', connections.length)
    })

    // Send messages
    socket.on('new message', function(data) {
        console.log("Server received message event")
        io.sockets.emit('new message', {messages: data})
    })
})

// Middleware
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/* app.use(
    session({
        secret: 'dcgbfxdgn',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
)
app.use(require('./middlewares/flash'))

app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
    }
    next()
}) */

app.use('/session', routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)

// Error handling middleware
app.use(function(err, req, res, next) {
    res.status(422).send({ error: err.message })
})

const eraseDatabaseOnSync = true

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([models.User.deleteMany({}), models.Message.deleteMany({})])
        createUsersWithMessages()
    }
    server.listen(process.env.PORT, () => {
        console.log('- Listening for request...')
    })
})