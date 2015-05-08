var constants = require('../constants/constants');
var AppDispatcher = require('../dispatchers/appDispatcher');
var ApiHelper = require('../helpers/ApiHelper');
var LoginStore = require('../stores/LoginStore');

var LoginActionsCreators = {
  loginUser(username, password) {
    var data;
    data = {
      username: username,
      password: password
    };
    return ApiHelper('POST', 'auth/login', data, LoginActionsCreators.receiveUserLogin);
  },
  signupUser(username, password) {
    var data;
    data = {
      username: username,
      password: password
    };
    return ApiHelper('POST', 'auth/signup', data, LoginActionsCreators.receiveUserLogin);
  },
  updateAvatar(signingData) {
    var avatarUrl =
      'https://liveblogphotos2.s3-us-west-2.amazonaws.com/' + signingData.filename;
    var user = LoginStore.getCurrentUser();
    user.profile = user.profile || {};
    user.profile.avatarUrl = avatarUrl;

    return ApiHelper('PUT', 'auth/user', user, LoginActionsCreators.receiveUser);
  },
  logoutUser() {
    return AppDispatcher.handleServerAction({
      actionType: constants.LOGOUT_USER
    });
  },
  receiveUser(error, data) {
    return AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_USER,
      user: data
    });
  },
  receiveUserLogin(error, data) {
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
