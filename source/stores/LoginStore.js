var merge = require('react').lib.merge;
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/appDispatcher');
var constants = require('../constants/constants');

var CHANGE_EVENT = 'change';

var _currentUser = null;
var _authToken = null;
var _exp = null;

var _loginUser = function(userData, authToken, exp) {
  _currentUser = userData;
  _authToken = authToken;
  _exp = exp;
  window.localStorage.setItem('cg-auth-token', authToken);
  window.localStorage.setItem('cg-current-user', JSON.stringify(userData));
  window.localStorage.setItem('cg-auth-exp', exp);
  return window.fd_router.setRoute('/home');
};

var _logoutUser = function() {
  _currentUser = null;
  _authToken = null;
  _exp = null;
  window.localStorage.removeItem('cg-auth-token');
  window.localStorage.removeItem('cg-current-user');
  window.localStorage.removeItem('cg-auth-exp');
  return window.fd_router.setRoute('/login');
};

var LoginStore = merge(EventEmitter.prototype, {
  init: function() {
    var authToken, exp, userData;
    authToken = window.localStorage.getItem('cg-auth-token');
    userData = JSON.parse(window.localStorage.getItem('cg-current-user'));
    exp = window.localStorage.getItem('cg-auth-exp');
    if (exp && exp <= Date.now()) {
      return;
    }
    if (authToken && userData) {
      _currentUser = userData;
      _authToken = authToken;
      return _exp = exp;
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
  getCurrentUser: function() {
    return _currentUser;
  },
  getAuthToken: function() {
    return _authToken;
  }
});

LoginStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.actionType) {
    case constants.RECEIVE_LOGIN_USER:
      _loginUser(action.user, action.token, action.exp);
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
