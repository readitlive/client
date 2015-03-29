var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var WSHelper = require('../helpers/WSHelper');

var PostActionsCreators = {
  receivePosts: function(data) {
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_POSTS,
      data: data
    });
  },
};

module.exports = PostActionsCreators;
