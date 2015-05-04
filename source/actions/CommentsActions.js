var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var API = require('../helpers/ApiHelper');

var PostActionsCreators = {

  delete(comment) {
    API('DELETE', 'event/' + comment.eventId + '/comment/' + comment._id, {}, () => {});
    return AppDispatcher.handleServerAction({
      actionType: constants.DELETE_COMMENT,
      commentId: comment._id
    });
  },

  receiveComments(err, data) {
    if (err) return console.log(err);
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_COMMENTS,
      data: data
    });
  }
};

module.exports = PostActionsCreators;
