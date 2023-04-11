const Rent = require('../model/rent.js')

class RentController {
    addRent(req, res, next) {
        const rent = new Rent(req.body);
        rent.save()
            .then((data) => res.status(200).json(data))
            .catch((error) =>
                res.status(403).json({
                    message: error,
                })
            );
    }

    confirmRent(req, res, next) {

        Rent
            .findOneAndUpdate(
                { id: req.params.id },
                {
                    $set: {
                        isConfirmed: 1
                    },
                },
                { new: true }
            )
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(400).json({ message: "Khong update duoc" }));
    }
    waitingRent(req, res, next) {
        Rent
            .find({ hostID: req.params.hostId, isConfirmed: req.params.isConfirmed })
            .then((data) => res.json(data))
            .catch((error) => res.jon(error));
    }
    getListRentUser(req, res, next) {
        Rent
            .find({ userID: req.params.userId })
            .then((data) => res.json(data))
            .catch((error) => res.jon(error));
    }
    unConfirmRent(req, res, next) {
        Rent
            .findOneAndUpdate(
                { id: req.params.id },
                {
                    $set: {
                        isConfirmed: 2
                    },
                },
                { new: true }
            )
            .then((result) => res.status(200).json(result))
            .catch((error) => res.status(400).json({ message: "Khong update duoc" }));
    }
}

module.exports = new RentController();