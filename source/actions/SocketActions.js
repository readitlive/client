var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');

var SocketActionsCreators = {
  receiveUpdate(update) {
    var {method, type, data} = update;
    if (type === 'Entry' && method === 'post') {
      return AppDispatcher.handleServerAction({
        actionType: constants.RECEIVE_POST,
        data: data
      });
    }
    if (type === 'Entry' && method === 'delete') {
      return AppDispatcher.handleServerAction({
        actionType: constants.DELETE_POST,
        data: data
      });
    }
    if (type === 'Entry' && method === 'put') {
      return AppDispatcher.handleServerAction({
        actionType: constants.PUT_POST,
        data: data
      })
    }
    if (type === 'ViewerCount' && method === 'put') {
      return AppDispatcher.handleServerAction({
        actionType: constants.UPDATE_VIEWER_COUNT,
        data: data
      });
    }
  }
};

module.exports = SocketActionsCreators;