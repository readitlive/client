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

var CommentsActions = {
  delete(comment) {
    API('DELETE', 'event/' + comment.eventId + '/comment/' + comment._id, {}, () => {
      return AppDispatcher.handleServerAction({
        actionType: constants.DELETE_COMMENT,
        commentId: comment._id
      });
    });
  },

  receiveComments(err, data) {
    if (err) return console.log(err);
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_COMMENTS,
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
      avatarUrl: user.profile && user.profile.avatarUrl,
      timeEU: timeEUString
    };
    API('POST', 'event/' + eventId + '/comment', data, () => {});
  },

  submitCommentAsPost(comment) {
    var data = {
      postText: comment.postText,
      eventId: comment.eventId,
      postIsComment: false,
      author: comment.author,
      avatarUrl: comment.avatarUrl,
      timeEU: comment.timeEU
    };

    API('POST', 'event/' + comment.eventId, data, () => {
      CommentsActions.delete(comment);
    });
  },
};

module.exports = CommentsActions;
