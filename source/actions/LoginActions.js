var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var ApiHelper = require('../helpers/ApiHelper');

var LoginActionsCreators = {
  loginUser: function(username, password) {
    var data;
    data = {
      username: username,
      password: password
    };
    return ApiHelper('POST', 'auth/login', data, LoginActionsCreators.receiveUserLogin);
  },
  signupUser: function(username, password) {
    var data;
    data = {
      username: username,
      password: password
    };
    return ApiHelper('POST', 'auth/signup', data, LoginActionsCreators.receiveUserLogin);
  },
  logoutUser: function() {
    return AppDispatcher.handleServerAction({
      actionType: constants.LOGOUT_USER
    });
  },
  receiveUserLogin: function(error, data) {
    if (error) {

    } else {
      return AppDispatcher.handleServerAction({
        actionType: constants.RECEIVE_LOGIN_USER,
        user: data.user,
        token: data.token,
        exp: data.exp
      });
    }
  }
};

module.exports = LoginActionsCreators;
