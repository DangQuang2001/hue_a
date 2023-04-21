const Comment = require('../model/comment.js')
const Post = require('../model/post.js')
const ReplyComment = require('../model/reply_comment.js')
var ObjectId = require("mongoose").Types.ObjectId;

class PostController {
    addComment(req, res, next) {
        var body = req.body;
        const id = new ObjectId();
        Comment.findOneAndUpdate({ _id: new ObjectId(body.postId) },
            {
                $push: {
                    comment: {
                        _id: id,
                        userId: body.comment.userId,
                        content: body.comment.content,
                        typeC: body.comment.typeC,
                        createdAt: body.comment.createdAt,
                        replyCommentId: id
                    }
                },
            },
            { new: true }
        )
            .then((data) => {

                Post.findOneAndUpdate(
                    { _id: new ObjectId(data._id) },
                    [
                        {
                            $set: {
                                commentsCount: data.comment.length
                            }
                        }
                    ],
                    { new: true }
                )
                    .then((result) => res.status(200).json(data))
                    .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }

    getComment(req, res, next) {
        var data = req.body;
        Comment
            .findOne({ _id: new ObjectId(data.postId) }).populate('comment.userId', 'name image').populate('comment.replyCommentId')
            .then((result) => res.json(result))
            .catch((error) => next(error));
    }

    createReplyComment(req, res, next) {
        const reply = new ReplyComment({
            _id: new ObjectId(req.body.id),
            comment: req.body.comment
        })
        reply.save()
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json(error))
    }

    getReplyComment(req, res, next) {
        const data = req.body;
        ReplyComment.findOne({ _id: new ObjectId(data.id) }).populate('comment.userId', 'name image')
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(403).json(error))
    }

    addReplyComment(req, res, next) {
        var body = req.body;
        ReplyComment.findOneAndUpdate({ _id: new ObjectId(body.commentId) },
            {
                $push: {
                    comment: {
                        userId: body.comment.userId,
                        content: body.comment.content,
                        typeC: body.comment.typeC,
                        createdAt: body.comment.createdAt,
                    }
                },
            },
            { new: true }
        )
            .then((data) => { res.status(200).json(data) })
            .catch((error) => res.status(403).json(error))
    }

}

module.exports = new PostController();