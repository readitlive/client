var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var R = require('ramda');

var AppDispatcher = require('../dispatchers/appDispatcher');
var WSHelper = require('../helpers/WSHelper');
var API = require('../helpers/ApiHelper');
var constants = require('../constants/constants');
var PostsActions = require('../actions/PostsActions');

var CHANGE_EVENT = 'change';

var _posts = [];

var PostsStore = assign({}, EventEmitter.prototype, {
  init: function(eventId) {
    _posts = [];
    API('GET', 'event/' + eventId + '/entry', {}, PostsActions.receivePosts);
    WSHelper.connect(PostsActions.receiveUpdate);
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
    if (_posts.length) {
      return R.reverse(_posts);
    }
    return [];
  }
});

PostsStore.dispatcherToken = AppDispatcher.register(function(payload) {
  var action;
  action = payload.action;
  switch (action.actionType) {
    case constants.RECEIVE_POSTS:
      _posts = _posts.concat(action.data);
      PostsStore.emitChange();
      break;
    case constants.RECEIVE_POST:
      _posts.push(action.data.entry);
      PostsStore.emitChange();
      break;
    case constants.DELETE_POST:
      var index = R.findIndex(R.propEqual('_id', action.data.entry._id));
      _posts = R.remove(index, 1);
      PostsStore.emitChange();
      break;
  }
  return true;
});

module.exports = PostsStore;
