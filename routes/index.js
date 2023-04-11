const express = require('express');
let middleware = require("../middleware");

const routes = express.Router();

const MotelHouseController = require('../controller/motel_house_controller');
const UserController = require('../controller/user_controller');
const RentController = require('../controller/rent_controller');
const FcmTokenController = require('../controller/fcmToken_controller');
const NotifcationController = require('../controller/notification_controller');
const PostController = require('../controller/post_controller');
const ChatController = require('../controller/chat_controller');

//MotelHouse
routes.post('/motelhouse/create', MotelHouseController.addMotel) // Them MotelHouse
routes.delete('/motelhouse/delete/:id', MotelHouseController.deleteMotel) // Xoa MotelHouse
routes.delete('/motelhouse/remove/:id', MotelHouseController.remove) // Remove MotelHouse
routes.delete('/motelhouse/restore/:id', MotelHouseController.restore) // Remove MotelHouse
routes.post('/motelhouse/update', MotelHouseController.updateMotel) // update MotelHouse
routes.get('/motelhouse', MotelHouseController.getAllMotel) // Get All MotelHouse
routes.get('/motelhouse/get-list-name/all', MotelHouseController.getListNameMotel) // Get List Name Motel
routes.post('/motelhouse/lazyloading', MotelHouseController.getOffsetMotel) // Lazyloading motel
routes.post('/motelhouse/filter', MotelHouseController.getOffsetFilter) // Lazyloading filter
routes.get('/motelhouse/:hostID', MotelHouseController.getAllMotelHost) // Get all Motel of Host
routes.get('/motelhouse/listremove/:hostID', MotelHouseController.getListRemove) // Get listRemove
routes.get('/motelhouse/get-motel-detail/:id', MotelHouseController.getMotelDetail) //getMotel detail
routes.get('/motelhouse/search/:searchValue', MotelHouseController.search) //search Motel
routes.get('/motelhouse/top/rating', MotelHouseController.getRatingMotel) //get top Rating

//User
routes.get('/user', UserController.getAllUsers)
routes.get('/user/get-user-detail/:id', UserController.getUser)
routes.post('/user/create', UserController.addUser)
routes.post('/user/update', UserController.updateUser)
routes.post('/user/changeavatar', UserController.changeAvatar)
routes.post('/user/login', UserController.login)
routes.get('/user/checkemail/:email', UserController.checkIsmail)

//Rent

routes.post('/rent/create', RentController.addRent) //Add rent
routes.get('/rent/confirm/:id', RentController.confirmRent) //confirm rent
routes.get('/rent/waiting/:hostId/:isConfirmed', RentController.waitingRent) //waiting rent
routes.get('/rent/unconfirm/:id', RentController.unConfirmRent) //unconfirm rent
routes.get('/rent/rentuser/:userId', RentController.getListRentUser) //unconfirm rent

//FcmToken
routes.post('/fcmtoken/checkdevicetoken', FcmTokenController.checkDeviceToken)
routes.post('/fcmtoken/checkdeviceturnoff', FcmTokenController.checkDeviceTurnOff)
routes.post('/fcmtoken/check-user-turn-off', FcmTokenController.checkUserTurnOff)
routes.post('/fcmtoken/check-user-token', FcmTokenController.checkUserToken)
routes.post('/fcmtoken/check-user-logout', FcmTokenController.checkUserLogOut)
routes.post('/fcmtoken/create', FcmTokenController.checkDeviceToken) // Them fcmToken
routes.get('/fcmtoken/get-list-token-device', FcmTokenController.getListTokenDevice) // Get list fcmToken


//Notification

routes.post('/notification/create', NotifcationController.addNotification) // add Notification
routes.get('/notification/filter/:hostID', NotifcationController.getAllNotification) // Get all Notification
routes.get('/notification/delete-notification/:userID', NotifcationController.checkNotification) // delete Notification

//post 

routes.post('/post/create', PostController.addPost) // add Post
routes.post('/post/get-all-post-by-tag', PostController.getAllPostByTag) // add Post
routes.post('/post/like-post', PostController.likePost) // like Post

//Chat

routes.post('/room-chat/create-room', ChatController.createRoom) // Create Room Chat
// {
//     "room":{
//         "id":"1234",
//       "userId": ["641c29083bc17ac95845c840","641bf8cdb304392234002c7f"]  
//     } ,
//     "message":{
//         "userId":"641c29083bc17ac95845c840",
//         "content":"Chao anh!",
//         "typeM":"text",
//         "createdAt":"2023-04-09T15:51:57.637Z"
//     }
//   }


routes.get('/room-chat/get-room-chat/:userId', ChatController.getRoomChat) // Get room Chat
routes.post('/room-chat/get-chat-detail', ChatController.getChatDetail) // Get room Chat
routes.post('/room-chat/check-room', ChatController.checkRoom) // Check Room
routes.post('/room-chat/add-message', ChatController.addMessage) // Add message

module.exports = routes;