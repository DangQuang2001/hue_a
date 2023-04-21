const Favourite = require('../model/favourite.js')
var ObjectId = require("mongoose").Types.ObjectId;

class FavouriteController {
    addFavourite(req, res, next) {
        const favourite = new Favourite(req.body);
        favourite.save()
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );

    }

    getFavourite(req, res, next) {
        Favourite.find({ userId: req.params.userId }).populate('roomId').sort({ createdAt: -1 })
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );

    }

    deleteFavourite(req, res, next) {
        var data = req.body;
        Favourite.findOneAndDelete({ roomId: data.roomId, userId: data.userId })
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );

    }

    CheckFavourite(req, res, next) {
        var data = req.body;
        Favourite.findOne({ roomId: data.roomId, userId: data.userId })
            .then((data) => {
                if (data) {
                    return res.status(200).json(data)
                }
                else {
                    return res.status(201).json(data)
                }
            })
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );

    }
}

module.exports = new FavouriteController();