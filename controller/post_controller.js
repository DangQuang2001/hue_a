const Post = require('../model/post.js')
const Comment = require('../model/comment.js')
const ReplyComment = require('../model/reply_comment.js')
var ObjectId = require("mongoose").Types.ObjectId;

class PostController {
    addPost(req, res, next) {
        const post = new Post(req.body);
        post.save()
            .then((data) => {
                const comment = new Comment({
                    _id: new ObjectId(data._id),
                    comment: []
                });
                comment.save()
                    .then((result) => res.status(200).json(data))
                    .catch((error) =>
                        res.status(403).json({
                            message: error,
                        })
                    );
            })
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );

    }
    getAllPostByTag(req, res, next) {
        var data = req.body;
        Post
            .find({ tag: { $in: data.tag }, isHidden: { $ne: data.isHidden }, isHiddenHost: false }).sort({ createdAt: -1 })
            .then((result) => res.json(result))
            .catch((error) => next(error));
    }

    likePost(req, res, next) {
        var data = req.body;
        Post.findOne({ _id: new ObjectId(data.id) })
            .then((post) => {
                if (!post) {
                    return res.status(404).send("Post not found");
                }
                if (post.likedBy.includes(data.userId)) {
                    return res.status(400).send("User already liked the post");
                }
                post.likedBy.push(data.userId);
                post.likesCount = post.likedBy.length;
                post.save()
                    .then((result) => res.json(result))
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }

    dislikePost(req, res, next) {
        var data = req.body;
        console.log(data.id)
        Post.findOne({ _id: new ObjectId(data.id) })
            .then((post) => {
                if (!post) {
                    return res.status(404).send("Post not found");
                }
                const userIdx = post.likedBy.indexOf(data.userId);
                if (userIdx === -1) {
                    return res.status(400).send("User has not liked the post yet");
                }
                post.likedBy.splice(userIdx, 1);
                post.likesCount = post.likedBy.length;
                post.save()
                    .then((result) => res.json(result))
                    .catch((error) => next(error));
            })
            .catch((error) => next(error));
    }

    getPostByUserId(req, res, next) {
        Post.find({ userId: req.params.userId })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(403).json(error))
    }

    deletePost(req, res, next) {
        Post.findOneAndDelete({ _id: new ObjectId(req.params.postId) })
            .then((data) => {
                Comment.findOneAndDelete({ _id: new ObjectId(data._id) })
                    .then((result) => res.status(200).json(result))
                    .catch((error) => res.status(403))
            })
            .catch((error) => res.status(403))
    }

    hiddenPost(req, res, next) {
        var data = req.body
        Post.findByIdAndUpdate({ _id: new ObjectId(data.id) },
            {
                $push: {
                    isHidden: data.userId
                },
            }
        )
            .then((data) => res.status(200).json(data))
            .catch((error) => console.log(error))

    }
    hiddenHost(req, res, next) {
        var data = req.body
        Post.findByIdAndUpdate({ _id: new ObjectId(data.id) },
            {
                $set: {
                    isHiddenHost: data.isHiddenHost
                },
            }
        )
            .then((data) => res.status(200).json(data))
            .catch((error) => console.log(error))

    }

}

module.exports = new PostController();