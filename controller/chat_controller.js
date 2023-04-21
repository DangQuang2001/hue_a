const ChatRoom = require('../model/chat_room.js')
const ChatDetail = require('../model/chat_detail.js')
var ObjectId = require("mongoose").Types.ObjectId;

class ChatController {
    createRoom(req, res, next) {
        const chatRoom = new ChatRoom({
            _id: new ObjectId(),
            id: req.body.room.id,
            userId: req.body.room.userId
        });

        chatRoom.save()
            .then((data) => {
                const chatDetail = new ChatDetail({ _id: new ObjectId(data._id), message: [req.body.message], readBy: [] })
                chatDetail.save()
                    .then((result) => res.status(200).json(result))
                    .catch((error) => console.log(error))
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
        ChatRoom.find({ userId: { $all: req.params.userId } }).populate('userId', '_id name image').populate('_id', { 'message': { '$last': "$message" }, 'readBy': 1 },).sort({ updatedAt: -1 })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }

    getChatDetail(req, res, next) {
        var body = req.body
        ChatDetail.find({ _id: new ObjectId(body.roomId) }, { message: { $slice: [body.skip, body.limit] } })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }

    addMessage(req, res, next) {
        var body = req.body;
        ChatDetail.findOneAndUpdate({ _id: new ObjectId(body.roomId) },
            {
                $push: {
                    message: body.message
                },
                $set: {
                    readBy: [body.message.userId]
                }
            },
            { new: true }
        )
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }
    isReadMessage(req, res, next) {
        var body = req.body;
        ChatDetail.findOneAndUpdate({ _id: new ObjectId(body.roomId) },
            {
                $addToSet: {
                    readBy: [body.userId]
                }
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