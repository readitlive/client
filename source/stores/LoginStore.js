
var R = require('ramda');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/appDispatcher');
var constants = require('../constants/constants');

var CHANGE_EVENT = 'change';

var _currentUser;
var _authToken;
var _exp;
var _loginError;

var _loginUser = function(userData, authToken, exp) {
  _currentUser = userData;
  _authToken = authToken;
  _exp = exp;
  window.localStorage.setItem('ril-auth-token', authToken);
  window.localStorage.setItem('ril-current-user', JSON.stringify(userData));
  window.localStorage.setItem('ril-auth-exp', exp);
};

var _updateUser = function(userData) {
  _currentUser = userData;
  window.localStorage.setItem('ril-current-user', JSON.stringify(userData));
};

var _logoutUser = function() {
  _currentUser = null;
  _authToken = null;
  _exp = null;
  window.localStorage.removeItem('ril-auth-token');
  window.localStorage.removeItem('ril-current-user');
  window.localStorage.removeItem('ril-auth-exp');
};

var LoginStore = assign({}, EventEmitter.prototype, {
  init: function() {
    var authToken = window.localStorage.getItem('ril-auth-token');
    var userData;
    try {
      userData = JSON.parse(window.localStorage.getItem('ril-current-user'));
    } catch (e) {
      userData = null;
    }
    var exp = window.localStorage.getItem('ril-auth-exp');
    if (!exp || (exp && exp <= Date.now()) || !authToken || !userData) {
      _logoutUser();
    } else {
      _currentUser = userData;
      _authToken = authToken;
      _exp = exp;
    }
  },
  emitChange: function() {
    return this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    return this.removeListener(CHANGE_EVENT, callback);
  },
  getLoginError: function() {
    return _loginError;
  },
  getCurrentUser: function() {
    return _currentUser;
  },
  getAuthToken: function() {
    return _authToken;
  },
  userIsAdmin: function(event) {
    if (!_currentUser || !_currentUser.username || !event.adminUsers) return false;
    var index = R.indexOf(_currentUser.username, event.adminUsers);
    return index >= 0;
  }
});

LoginStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.actionType) {
    case constants.RECEIVE_LOGIN_USER:
      _loginUser(action.user, action.token, action.exp);
      _loginError = null;
      LoginStore.emitChange();
      break;
    case constants.RECEIVE_USER:
      _updateUser(action.user);
      LoginStore.emitChange();
      break;
    case constants.RECEIVE_LOGIN_ERROR:
      _loginError = action.message;
      LoginStore.emitChange();
      break;
    case constants.LOGOUT_USER:
      _logoutUser();
      LoginStore.emitChange();
      break;
  }
  return true;
});

module.exports = LoginStore;
