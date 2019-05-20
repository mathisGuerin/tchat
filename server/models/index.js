const mongoose = require('mongoose')

const User = require('./user')
const Message = require('./message')

exports.connectDb = () => {
    var connect = mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })

    var db = mongoose.connection
    db.on('error', console.error.bind(console, '- Erreur lors de la connexion'))
    db.once('open', function() {
        console.log('- Connexion à la base OK')
    })

    return connect
}

exports.models = { User, Message }
