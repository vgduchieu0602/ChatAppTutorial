import messageModel from '../models/message.model.js'

export const createMesssage = async (req, res) => {
    const {chatId, senderId, text} = req.body

    const message = new messageModel({
        chatId, senderId, text
    })

    try {
        const response = await message.save()

        res
            .status(200)
            .json(response)
    } catch (error) {
        console.log("Error in create message: ", error)
        res
            .status(500)
            .json(error)
    }
}

export const getMessage  = async (req, res) => {
    const {chatId} = req.params

    try {
        const messsage = await messageModel.find({chatId})

        res
            .status(200)
            .json(messsage)
    } catch (error) {
        console.log("Error in get message: ", error)
        res
            .status(500)
            .json(error)
    }
}