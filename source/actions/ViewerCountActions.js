var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var EventStore = require('../stores/EventStore');
var WSHelper = require('../helpers/WSHelper');
var API = require('../helpers/ApiHelper');
// var LoginStore = require('../stores/LoginStore');

var ViewCountActionCreators = {
  receive(err, data) {
    return AppDispatcher.handleServerAction({
      actionType: constants.UPDATE_VIEWER_COUNT,
      data: data
    });
  }
};

module.exports = ViewCountActionCreators;
