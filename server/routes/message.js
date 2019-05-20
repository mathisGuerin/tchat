import { Router } from 'express'
import Message from '../models/message'

const router = Router()

router.get('/', (req, res) => {
    console.log('--- GET messages')
    Message.find({}).then((err, message) => {
        err ? res.send(err) : res.send(message)
    })
})

router.get('/:messageId', (req, res) => {
    console.log(`--- GET message. id = ${req.params.messageId}`)
    Message.findById(req.params.messageId, (err, message) => {
        err ? res.send(err) : res.send(message)
    })
})

router.post('/', (req, res) => {
    console.log('--- POST message')
    console.log(req.body)
    Message.create(req.body).then(message => {
        res.send(message)
    })
})

router.delete('/:messageId', (req, res) => {
    console.log(`--- DELETE message. id = ${req.params.messageId}`)
    Message.findByIdAndRemove({ _id: req.params.messageId }).then(message => res.send(message))
})

router.put('/:messageId', (req, res) => {
    console.log(`--- PUT message. id = ${req.params.messageId}`)
    Message.findByIdAndUpdate({ _id: req.params.messageId }, req.body).then(() => {
        Message.findOne({ _id: req.params.id }).then(message => {
            res.send(message)
        })
    })
})

export default router
