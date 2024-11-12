import chatModel from '../models/chat.model.js'

export const createChat = async (req, res) => {
    const {firstId, secondId} = req.body

    try {
        //findOne: trả về 1 data duy nhất nếu ko trả về null
        //$all: là điều kiện tìm kiếm. Tìm kiếm tất cả các data chứa trong phần tử mảng
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })

        //Nếu data được tìm thấy, đoạn code sẽ trả về 1 phản hồi HTTP với trạng thái 200 và nội dung là data được tìm thấy
        if(chat) {
            return res.status(200).json(chat)
        }

        //Nếu data không tìm được, sẽ tạo một data mới trong collection chat với mảng members chứa cả firstId và secondId
        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        //Lưu data mới vào DB
        const response = await newChat.save()

        res.status(200).json(response)
    } catch (error) {
        console.log("Error in create chat: ", error)
        res
            .status(500)
            .json(error)
    }
}

export const findUserChats = async(req, res) => {
    const {userId} = req.params

    try {
        const chats = await chatModel.find({
            members: {$in: [userId]}
        })

        res.status(200).json(chats)
    } catch (error) {
        console.log("Error in find user chat: ", error)
        res.status(500).json(error)
    }
}

export const findChat = async(req, res) => {
    const {firstId, secondId} = req.params

    try {
        const chat = await chatModel.find({
            members: {$all: [firstId, secondId]}
        })

        res.status(200).json(chat)
    } catch (error) {
        console.log("Error in find chat: ", error)
        res.status(500).json(error)
    }
}
