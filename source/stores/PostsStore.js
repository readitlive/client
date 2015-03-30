var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('../dispatchers/appDispatcher');
var WSHelper = require('../helpers/WSHelper');
var constants = require('../constants/constants');
var PostsActions = require('../actions/PostsActions');

var CHANGE_EVENT = 'change';

var _posts = null;

var PostsStore = assign({}, EventEmitter.prototype, {
  init: function() {
    WSHelper.connect(PostsActions.receivePosts);
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
  getPosts: function() {
    return _posts || [];
  }
});

PostsStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.actionType) {
    case constants.RECEIVE_POSTS:
      _posts = action.data;
      PostsStore.emitChange();
      break;

  }
  return true;
});

module.exports = PostsStore;
