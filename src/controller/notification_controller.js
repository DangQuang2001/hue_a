const Notification = require('../model/notification.js')

class NotificationController {
    addNotification(req, res, next) {
        const notification = new Notification(req.body);
        notification.save()
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );
    }

    getAllNotification(req, res, next) {
        Notification
            .find({ hostID: { $nin: req.params.hostID }, isDelete: { $nin: [req.params.hostID] } }).sort({ dateSend: -1 })
            .then((data) => res.json(data))
            .catch((error) => next(error));
    }
    checkNotification(req, res, next) {
        Notification.updateMany({
            hostID: { $ne: req.params.hostID }
        }, {
            $push: {
                isDelete: req.params.userID
            },
        })
            .then((result) => {
                return res.status(200).json(result);
            })
            .catch((err) => {
                console.log(err);
                res.send({
                    status: 0,
                    message: "Something went wrong.",
                    methodName: "CheckIsmail",
                });
            });

    }
}

module.exports = new NotificationController()