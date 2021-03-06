var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var API = require('../helpers/ApiHelper');

var EventActions = {
  receiveEvent(err, data) {
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_EVENT,
      event: data
    });
  },

  toggleLive(event) {
    event.eventIsLive = !event.eventIsLive;
    API('PUT', 'event/' + event._id, event, EventActions.receiveEvent);
    return AppDispatcher.handleViewAction({
      actionType: constants.EVENT_LIVE_TOGGLE,
      event: event
    });
  },
  delete(event, callback) {
    API('DELETE', 'event/' + event._id, event, callback);
  }
};

module.exports = EventActions;
