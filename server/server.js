import 'dotenv/config'
import { models } from './models'
import routes from './routes'
import { connectDb } from './models'
import cors from 'cors'
import bodyParser from 'body-parser'
import createUsersWithMessages from './helpers/database'

import express from 'express'
import uuid from 'uuid/v4'
import session from 'express-session'
const FileStore = require('session-file-store')(session)

let app = express()
let server = app.listen(process.env.PORT)
var io = require('socket.io')(server)
var connections = []

// Middleware
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// add & configure middleware
app.use(
    session({
        genid: req => {
            console.log('Inside the session middleware')
            console.log(req.sessionID)
            return uuid() // use UUIDs for session IDs
        },
        store: new FileStore(),
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
)

// create the homepage route at '/'
app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.sessionID)
    res.send(`You hit home page!\n`)
})

app.use('/api/users', routes.user)
app.use('/api/messages', routes.message)

// Error handling middleware
app.use(function(err, req, res, next) {
    res.status(422).send({ error: err.message })
})

// Database connection
const eraseDatabaseOnSync = true
connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([models.User.deleteMany({}), models.Message.deleteMany({})])
        createUsersWithMessages()
    }
})

io.on('connection', function(socket) {
    connections.push(socket)
    console.log('Connected: %s sockets connected', connections.length)
    console.log('socket.id : ', socket.id)
    // Disconnect
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1)
        console.log('Diconnected: %s sockets connected', connections.length)
    })

    // Send messages
    socket.on('new message', function(data) {
        console.log('Server received message event')
        io.sockets.emit('new message', { messages: data })
    })
})
