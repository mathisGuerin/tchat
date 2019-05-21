import { models } from '../models'

async function createUsersWithMessages() {
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

export default createUsersWithMessages