var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var EventStore = require('../stores/EventStore');
var WSHelper = require('../helpers/WSHelper');
var API = require('../helpers/ApiHelper');
// var LoginStore = require('../stores/LoginStore');

var PostActionsCreators = {
  receivePosts(err, data) {
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_POSTS,
      data: data
    });
  },

  receivePost(err, data) {
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_POST,
      data: data
    });
  },

  receiveUpdate(update) {
    var {method, type, data} = update;
    if (method === 'post' && type === 'Entry') {
      return AppDispatcher.handleServerAction({
        actionType: constants.RECEIVE_POST,
        data: data
      });
    }
    if (method === 'delete' && type === 'Entry') {
      return AppDispatcher.handleServerAction({
        actionType: constants.DELETE_POST,
        data: data
      });
    }
  },

  submit(postText) {
    var timeNow = new Date();
    var euh = timeNow.getUTCHours() + 2;
    if (euh < 10 ) { euh = "0" + euh; }
    var eum = timeNow.getUTCMinutes();
    if (eum < 10 ) { eum = "0" + eum; }
    var timeEUString = euh + ":" + eum + " CEST";

    // var user = LoginStore.getCurrentUser();
    var eventId = EventStore.getEvent()._id;
    var data = {
      postText: postText,
      author: user.username,
      eventId: eventId,
      postIsComment: false,
      avatarUrl: user.avatarUrl,
      timeEU: timeEUString
    };
    API('POST', 'event/' + eventId, data, () => {});
  }
};

module.exports = PostActionsCreators;


var user = {
  name: 'CPelkey',
  avatarUrl: 'http://liveblogphotos.s3-us-west-2.amazonaws.com/c1b8987d-9a4a-4f32-b8db-86e5e3e1a662.jpeg',
};
