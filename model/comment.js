const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    comment: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId
            },
            replyCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'ReplyComment' },
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


module.exports = mongoose.model('Comment', commentSchema);