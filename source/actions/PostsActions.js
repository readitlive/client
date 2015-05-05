var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var EventStore = require('../stores/EventStore');
var API = require('../helpers/ApiHelper');
var LoginStore = require('../stores/LoginStore');

var getTimeEU = function() {
  var timeNow = new Date();
  var euh = timeNow.getUTCHours() + 2;
  if (euh < 10 ) { euh = "0" + euh; }
  var eum = timeNow.getUTCMinutes();
  if (eum < 10 ) { eum = "0" + eum; }
  return euh + ":" + eum + " CEST";
};

var PostActionsCreators = {
  receivePosts(err, data) {
    if (err) return console.log(err);
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_POSTS,
      data: data
    });
  },

  receivePost(err, data) {
    if (err) return console.log(err);
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_POST,
      data: data
    });
  },

  submit(postText) {
    var timeEUString = getTimeEU();
    var user = LoginStore.getCurrentUser();
    var eventId = EventStore.getEvent()._id;

    var data = {
      postText: postText,
      eventId: eventId,
      postIsComment: false,
      author: user.username,
      avatarUrl: user.avatarUrl,
      timeEU: timeEUString
    };
    API('POST', 'event/' + eventId, data, () => {});
  },

  update(entryId, newPostText, callback) {
    var eventId = EventStore.getEvent()._id;
    var data = {
      postText: newPostText
    };
    API('PUT', 'event/' + eventId + '/entry/' + entryId, data, callback);
  },

  delete(post) {
    API('DELETE', 'event/' + post.eventId + '/entry/' + post._id, {}, () => {});
  },

  reply(entry, replyText) {
    var user = LoginStore.getCurrentUser();
    var timeEUString = getTimeEU();
    var eventId = EventStore.getEvent()._id;
    var reply = {
      replyText: replyText,
      author: user.username,
      avatarUrl: user.avatarUrl,
      timeEU: timeEUString
    };
    if (entry.replies && entry.replies.length) {
      entry.replies.push(reply);
    } else {
      entry.replies = [reply];
    }

    API('PUT', 'event/' + eventId + '/entry/' + entry._id, entry, () => {});
  }
};

module.exports = PostActionsCreators;
