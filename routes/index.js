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
const CommentController = require('../controller/comment_controller');
const FavouriteController = require('../controller/favourite_controller');

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
routes.post('/motelhouse/review-room', MotelHouseController.reviewRoom) //Review room by roomId & userId
routes.get('/motelhouse/get-review/:roomId', MotelHouseController.getReview) //Get review by roomId

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
routes.get('/fcmtoken/get-list-token-device', FcmTokenController.getListTokenDevice) // Get list fcmToken device
routes.get('/fcmtoken/get-list-token-user/:userId', FcmTokenController.getListTokenUser) // Get list fcmToken user


//Notification
routes.post('/notification/create', NotifcationController.addNotification) // add Notification
routes.get('/notification/filter/:hostID', NotifcationController.getAllNotification) // Get all Notification
routes.get('/notification/delete-notification/:userID', NotifcationController.checkNotification) // delete Notification

//post 
routes.post('/post/create', PostController.addPost) // add Post
routes.post('/post/get-all-post-by-tag', PostController.getAllPostByTag) // add Post
routes.post('/post/like-post', PostController.likePost) // like Post
routes.post('/post/dislike-post', PostController.dislikePost) // Dislike Post
routes.get('/post/get-post-by-userId/:userId', PostController.getPostByUserId) // Get Post by UserId
routes.post('/post/hidden-post', PostController.hiddenPost) // Hidden post
routes.post('/post/hidden-post-by-host', PostController.hiddenHost) // Hidden post by host
routes.get('/post/delete-post/:postId', PostController.deletePost) // Delete post

//Chat
routes.post('/room-chat/create-room', ChatController.createRoom) // Create Room Chat
routes.get('/room-chat/get-room-chat/:userId', ChatController.getRoomChat) // Get room Chat
routes.post('/room-chat/get-chat-detail', ChatController.getChatDetail) // Get room Chat
routes.post('/room-chat/check-room', ChatController.checkRoom) // Check Room
routes.post('/room-chat/add-message', ChatController.addMessage) // Add message
routes.post('/room-chat/is-read-message', ChatController.isReadMessage) // Check read message

// Comment 
routes.post('/post-comment/add-comment', CommentController.addComment)  // Add comment by PostId
routes.post('/post-comment/get-comment', CommentController.getComment)  // Get Comment by postId
routes.post('/post-comment/create-reply-comment', CommentController.createReplyComment)  // Reply comment 
routes.post('/post-comment/get-reply-comment', CommentController.getReplyComment)  // Get reply comment 
routes.post('/post-comment/add-reply-comment', CommentController.addReplyComment)  // Add reply comment 

//Favourite
routes.post('/favourite/add-favourite', FavouriteController.addFavourite) // Add favourite 
routes.get('/favourite/get-favourite/:userId', FavouriteController.getFavourite) // Get favourite 
routes.delete('/favourite/delete-favourite', FavouriteController.deleteFavourite) // Delete favourite 
routes.post('/favourite/check-favourite', FavouriteController.CheckFavourite) // Check favourite 

module.exports = routes;
