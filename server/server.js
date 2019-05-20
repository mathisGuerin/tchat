import 'dotenv/config'
import { models } from './models'
import routes from './routes'
const connectDb = require('./models').connectDb
let express = require('express')
let app = express()
var cors = require('cors')
let bodyParser = require('body-parser')
let session = require('express-session')

// Middleware
app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    session({
        secret: 'dcgbfxdgn',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
)
app.use(require('./middlewares/flash'))

app.use((req, res, next) => {
    /* req.context = {
        models,
        me: models.users[1],
    } */
    next()
})

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
    app.listen(process.env.PORT, () => {
        console.log('- Listening for request...')
    })
})

const createUsersWithMessages = async () => {
    console.log('- Creation of users')
    const user1 = new models.User({
        username: 'Mathis',
    })
    const user2 = new models.User({
        username: 'Guillaume',
    })
    const message1 = new models.Message({
        text: 'Hello',
        user: user1.id,
    })

    const message2 = new models.Message({
        text: 'Hello, how are you ?',
        user: user2.id,
    })

    const message3 = new models.Message({
        text: 'Good !',
        user: user2.id,
    })
    await message1.save()
    await message2.save()
    await message3.save()

    await user1.save()
    await user2.save()
}