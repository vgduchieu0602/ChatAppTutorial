import mongoose from 'mongoose'

const {Schema} = mongoose

const messsageSchema = new Schema({
    chatId: String,
    senderId: String,
    text: String
}, {
    timestamps: true
})

const messageModel = mongoose.model('Messages', messsageSchema)

export default messageModel