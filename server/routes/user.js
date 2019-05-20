import { Router } from 'express'
import User from '../models/user'

const router = Router()

// Get all Users
router.get('/', (req, res, next) => {
    console.log('--- GET all users')
    User.find({}).then((err, user) => {
        err ? res.send(err) : res.send(user)
    })
})

// Get User
router.get('/:userId', (req, res, next) => {
    console.log(`--- GET user. id = ${req.params.userId}`)
    User.findById(req.params.userId, (err, user) => {
        err ? res.send(err) : res.send(user)
    })
})

// Create a User, save it to the db, and execute a callback function
router.post('/', (req, res, next) => {
    console.log('--- POST user')
    User.create(req.body)
        .then(user => {
            res.send(user)
        })
        .catch(next)
})

module.exports = router
