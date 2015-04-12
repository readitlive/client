var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');

var EventActionCreators = {
  receiveEvent(err, data) {
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_EVENT,
      event: data
    });
  }
};

module.exports = EventActionCreators;
