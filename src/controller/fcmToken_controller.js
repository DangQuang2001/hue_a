const FcmUserToken = require('../model/fcmUserToken.js')
const FcmDeviceToken = require('../model/fcmDeviceToken.js')

class FcmTokenController {
    addFcmUserToken(req, res, next) {
        const fcmUserToken = new FcmUserToken(req.body);
        fcmUserToken.save()
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );
    }
    addFcmDeviceToken(req, res, next) {
        const fcmDeviceToken = new FcmDeviceToken(req.body);
        fcmDeviceToken.save()
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );
    }


    checkDeviceToken(req, res, next) {
        const fcmDeviceToken = new FcmDeviceToken(req.body);
        FcmDeviceToken.findOneAndUpdate({
            fcmToken: fcmDeviceToken.fcmToken
        }, {
            $set: {
                isOpenApp: true,
                lastSigned: fcmDeviceToken.lastSigned
            },
        })
            .then((result) => {
                if (result != null) {
                    return res.status(200).json(result);
                } else {
                    fcmDeviceToken.save()
                        .then((result) => res.status(201).json(result))
                        .catch((error) =>
                            res.status(403).json({
                                message: error,
                            })
                        );
                }
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
    checkUserToken(req, res, next) {
        const fcmUserToken = new FcmUserToken(req.body);
        FcmUserToken.findOneAndUpdate({
            fcmToken: fcmUserToken.fcmToken, userID: fcmUserToken.userID
        }, {
            $set: {
                isOnline: true,
                isSignOut: false,
                lastSigned: fcmUserToken.lastSigned
            },
        })
            .then((result) => {
                if (result != null) {
                    return res.status(200).json(result);
                } else {
                    fcmUserToken.save()
                        .then((result) => res.status(201).json(result))
                        .catch((error) =>
                            res.status(403).json({
                                message: error,
                            })
                        );
                }
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
    checkDeviceTurnOff(req, res, next) {
        const fcmDeviceToken = new FcmDeviceToken(req.body);
        FcmDeviceToken.findOneAndUpdate({
            fcmToken: fcmDeviceToken.fcmToken
        }, {
            $set: {
                isOpenApp: fcmDeviceToken.isOpenApp,
                lastSigned: fcmDeviceToken.lastSigned
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
    checkUserTurnOff(req, res, next) {
        const fcmUserToken = new FcmUserToken(req.body);
        FcmUserToken.findOneAndUpdate({
            fcmToken: fcmUserToken.fcmToken, userID: fcmUserToken.userID
        }, {
            $set: {
                isOnline: fcmUserToken.isOnline,
                lastSigned: fcmUserToken.lastSigned
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
    checkUserLogOut(req, res, next) {
        const fcmUserToken = new FcmUserToken(req.body);
        FcmUserToken.findOneAndUpdate({
            fcmToken: fcmUserToken.fcmToken, userID: fcmUserToken.userID
        }, {
            $set: {
                isOnline: false,
                isSignOut: true,
                lastSigned: fcmUserToken.lastSigned
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

    getListTokenDevice(req, res, next) {
        let listToken = [];
        FcmDeviceToken.find({
            isOpenApp: false
        })
            .then((result) => {
                result.map((e) => {
                    listToken.push(e.fcmToken);
                })
                return res.status(200).json(listToken)
            })
            .catch((error) => res.status(403).json({
                message: error,
            }))
    }

}

module.exports = new FcmTokenController();