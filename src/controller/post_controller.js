const Post = require('../model/post.js')


class PostController {
    addPost(req, res, next) {
        const post = new Post(req.body);
        post.save()
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );

    }
    getAllPostByTag(req, res, next) {
        var data = req.body;
        Post
            .find({ tag: { $in: data.tag }, isHidden: { $ne: data.id } }).sort({ createdAt: -1 })
            .then((result) => res.json(result))
            .catch((error) => next(error));
    }

    likePost(req, res, next) {
        var data = req.body;
        Post.findOneAndUpdate({ id: data.id }, {
            $addToSet: {
                likedBy: data.userId
            }
        })
            .then((result) => res.json(result))
            .catch((error) => next(error));
    }
}

module.exports = new PostController();