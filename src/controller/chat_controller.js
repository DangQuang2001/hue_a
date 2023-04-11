const ChatRoom = require('../model/chat_room.js')
const ChatDetail = require('../model/chat_detail.js')
class ChatController {
    createRoom(req, res, next) {
        const chatRoom = new ChatRoom(req.body.room);
        chatRoom.save()
            .then((data) => {
                const chatDetail = new ChatDetail({ roomChatId: data.id, message: [req.body.message], readBy: [] })
                chatDetail.save()
                    .then((result) => res.status(200).json(result))
                    .catch((error) => res.status(403).json({
                        message: error,
                    }))
            })
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );
    }

    checkRoom(req, res, next) {
        var body = req.body
        ChatRoom.findOne({ userId: { $all: body.userId } }).populate('userId', '_id name image')
            .then((data) => {
                if (data != null) {
                    return res.status(200).json(data)
                }
                else {
                    return res.status(201).json(data)
                }
            })
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }

    getRoomChat(req, res, next) {
        ChatRoom.find({ userId: { $all: req.params.userId } }).populate('userId', '_id name image')
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }

    getChatDetail(req, res, next) {
        var body = req.body
        ChatDetail.find({ roomChatId: body.roomId }, { message: { $slice: [body.skip, body.limit] } })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }

    addMessage(req, res, next) {
        var body = req.body;
        ChatDetail.findOneAndUpdate({ roomChatId: body.roomId },
            {
                $push: {
                    message: body.message
                },
            },
            { new: true }
        )
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }
}

module.exports = new ChatController();