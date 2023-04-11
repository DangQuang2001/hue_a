const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    caption: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    hostName: {
        type: String,
        required: true
    },
    avatar: { type: String },
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    roomId: {
        type: String,
    },
    roomName: {
        type: String
    },
    tag: {
        type: Number,
        required: true
    },
    imageUrls: [{ type: String }],
    likedBy: [{ type: String }],
    isHidden: [{ type: String }]
}, {
    timestamps: true,
});


module.exports = mongoose.model('Post', postSchema);;