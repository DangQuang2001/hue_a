const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replyComment = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    comment: [
        {
            userId: { type: String, required: true, ref: 'User' },
            content: {
                type: String,
                required: true,
            },
            typeC: {
                type: String,
                required: true
            },
            createdAt: { type: Date }
        }
    ]
}, {
    timestamps: true,
});


module.exports = mongoose.model('ReplyComment', replyComment);