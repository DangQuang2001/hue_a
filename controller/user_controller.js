const user = require("../model/user");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
var ObjectId = require("mongoose").Types.ObjectId;

class UserController {
  // Them hotel
  addUser(req, res, next) {
    const user = new User(req.body);
    user
      .save()
      .then((user) => res.status(200).json(user))
      .catch((error) =>
        res.status(403).json({
          message: "Loi",
        })
      );
  }
  getAllUsers(req, res, next) {
    User.find({})
      .then((users) => res.json(users))
      .catch((error) => next(error));
  }
  getUser(req, res, next) {
    User.findOne({ _id: new ObjectId(req.params.id) })
      .then((users) => res.json(users))
      .catch((error) => res.status(400).json({ message: "Access denied" }));
  }

  login(req, res, next) {
    var data = req.body;
    User.find({ email: data.email, })
      .then((result) => {
        if (result.length == 0) {
          return res.status(403).json("Username incorrect");
        }
        if (result[0].password === data.password) {
          let token = jwt.sign({ username: data.username }, config.key, {});
          res.status(200).json({
            data: result,
            token: token,
            msg: "success",
          });
        } else {
          res.status(404).send({ status: 0, message: "Password is incorrect" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({
          status: 0,
          message: "Something went wrong.",
          methodName: "login",
        });
      });
  }

  checkIsmail(req, res, next) {

    User.find({
      email: req.params.email,
    })
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(403).send({ status: 0, message: "Email is not valiable" });
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
  updateUser(req, res, next) {
    var data = req.body;
    user
      .findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            name: data.name,
            email: data.email,
            password: data.password,
            image: data.image,
            phone: data.phone,
            address: data.address
          },
        },
        { new: true }
      )
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(400).json({ message: "Khong update duoc" }));
  }
  updateRole(req, res, next) {
    var data = req.body;
    user
      .findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            isHost: data.isHost
          },
        },
        { new: true }
      )
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(400).json({ message: "Khong update duoc" }));
  }
  changeAvatar(req, res, next) {
    var data = req.body;
    user
      .findOneAndUpdate(
        { email: data.email },
        {
          $set: {
            image: data.image,
          },
        },
        { new: true }
      )
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(400).json({ message: "Khong update duoc" }));
  }
  deleteUser(req, res, next) { }
}

module.exports = new UserController();
