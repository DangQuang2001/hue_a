const MotelHouse = require('../model/motel_house.js')
const ReviewRoom = require('../model/review_room.js')

class MotelHouseController {

  addMotel(req, res, next) {
    const motelHouse = new MotelHouse(req.body);
    motelHouse.save()
      .then((data) => res.status(200).json(data))
      .catch((error) =>
        res.status(403).json({
          message: error,
        })
      );
  }

  getAllMotel(req, res, next) {
    MotelHouse
      .find({ isDelete: false })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }
  getListNameMotel(req, res, next) {
    MotelHouse
      .find({ isDelete: false }, ['id', 'name'])
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }

  getOffsetMotel(req, res, next) {
    var data = req.body;

    MotelHouse
      .find({ isDelete: false, category: { "$in": data.category } }).skip(data.skip).limit(data.limit)
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }

  getOffsetFilter(req, res, next) {
    var typename = "";
    var data = req.body;
    if (data.typeName == 1) {
      typename = "Cho thuê"
    }
    else if (data.typeName == 2) {
      typename = "Bán"
    }
    else {
      typename = "Dự án"
    }

    MotelHouse
      .find({ isDelete: false, typeName: typename }).skip(data.skip).limit(data.limit)
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }

  getAllMotelHost(req, res, next) {
    MotelHouse
      .find({ isDelete: false, hostID: req.params.hostID })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }
  getListRemove(req, res, next) {

    MotelHouse
      .find({ isDelete: true, hostID: req.params.hostID })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }
  getMotelDetail(req, res, next) {
    MotelHouse.findOne({ id: req.params.id.toString() })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({ message: "Access denied" }));
  }

  updateMotel(req, res, next) {
    var data = req.body;

    MotelHouse
      .findOneAndUpdate(
        { id: data.id },
        {

          $set: {
            name: data.name,
            description: data.description,
            category: data.category,
            images: data.images,
            longitude: data.longitude,
            latitude: data.latitude,
            image: data.image,
            adParams: data.adParams,
          },
        },
        { new: true }
      )
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(400).json({ message: "Khong update duoc" }));
  }

  remove(req, res, next) {
    MotelHouse
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            isDelete: true
          },
        },
        { new: true }
      )
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(400).json({ message: "Khong remove duoc" }));
  }

  restore(req, res, next) {
    MotelHouse
      .findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            isDelete: false
          },
        },
        { new: true }
      )
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(400).json({ message: "Khong remove duoc" }));
  }

  deleteMotel(req, res, next) {
    MotelHouse
      .findOneAndRemove({ id: req.params.id })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }

  getRatingMotel(req, res, next) {
    MotelHouse
      .find({ isDelete: false }).sort({ rating: -1 }).limit(5)
      .then((data) => res.json(data))
      .catch((error) => next(error));
  }

  async search(req, res, next) {
    try {
      const result = await MotelHouse.aggregate(
        [
          {
            '$search': {
              'index': 'default',
              'compound': {
                'must': [
                  {
                    'text': {
                      'query': req.params.searchValue,
                      'path': {
                        'wildcard': "*"
                      }
                    }
                  },
                  {
                    'equals': {
                      'path': 'isDelete',
                      'value': false
                    }
                  }
                ],

              }

            }
          }
        ]
      )

      res.status(200).json(result)
    }
    catch (error) {
      res.status(403).json(error)
    }
  }

  reviewRoom(req, res, next) {
    const reviewRoom = new ReviewRoom(req.body)
    reviewRoom.save()
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(403).json(error))
  }

  getReview(req, res, next) {
    ReviewRoom.find({
      roomId: req.params.roomId
    })
      .populate('userId')
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(403).json(error))
  }

  updateLocation(req, res, next) {
    MotelHouse.find({})
      .then((data) => {
        // lặp qua tất cả các document trong collection MotelHouse
        for (let i = 0; i < data.length; i++) {
          const motel = data[i];
          // tạo giá trị location mới từ longitude và latitude của document hiện tại
          const newLocation = {
            type: "Point",
            coordinates: [motel.longitude, motel.latitude]
          };
          // cập nhật giá trị location cho document hiện tại
          MotelHouse.updateOne({ id: motel.id }, { $set: { location: newLocation } })
            .then(() => console.log(`Cập nhật location cho motel ${motel.name} thành công`))
            .catch(error => console.log(`Cập nhật location cho motel ${motel.name} thất bại: ${error}`));
        }
      })
      .catch((error) => console.log(error));
  }

  //Get List Motel nearby positionCurrentUser limit()
  getNearby(req, res, next) {
    var data = req.body;
    MotelHouse.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [data.longitude, data.latitude] },
          distanceField: "distance",
          spherical: true,
          maxDistance: data.maxDistance
        }
      },
      { $skip: data.skip },
      { $limit: data.limit }
    ])
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(403).json(error))

  }
}

module.exports = new MotelHouseController();