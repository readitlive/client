
//don't mock what we're trying to test
jest.dontMock('../dev/stores/LoginStore.coffee');

// we need the real dispatcher to test how the store responds to actions
// The callbacks registered with the dispatcher are most of the public methods of LoginStore
// otherwise we have no way to test these callbacks
jest.dontMock('../dev/dispatchers/dispatcher.js');
jest.dontMock('../dev/dispatchers/appDispatcher.js');

var dd = require('./dummyData').loginDataFromServer;

//set up an immutable version of our dummy data
var loginDdJSON = JSON.stringify(dd);

// constants are used for firing actions
var constants = require('../dev/constants/constants.coffee').ActionTypes;

//mock local storage:
window.localStorage = {
  setItem: function() {
    return true;
  },
  getItem: function(item) {
    if (item === 'cg-auth-token') {
      return dd.token;
    }

    if (item === 'cg-current-user') {
      return JSON.stringify(dd.user);
    }

    if (item === 'cg-auth-exp') {
      return dd.exp - 1;
    }

    return true;
  },
  removeItem: function() {
    return true;
  }
};

//mock the router
window.fd_router = {
  setRoute: function() {
    return true;
  }
};

describe ('LoginStore', function() {

  var AppDispatcher = require('../dev/dispatchers/appDispatcher.js');
  var LoginStore = require('../dev/stores/LoginStore.coffee');

  it ('should exist', function () {
    expect(LoginStore).toBeDefined();
  });

  it ('should receive authentication information from the server', function() {

    AppDispatcher.handleServerAction({
      actionType: constants.RECEIVE_LOGIN_USER,
      user: dd.user,
      token: dd.token,
      exp: dd.exp
    });

    expect(LoginStore.getCurrentUser()).toEqual(dd.user);
    expect(LoginStore.getAuthToken()).toEqual(dd.token);
  });

  it ('should log the user out', function() {

    AppDispatcher.handleServerAction({
      actionType: constants.LOGOUT_USER
    });

    expect(LoginStore.getCurrentUser()).toEqual(null);
    expect(LoginStore.getAuthToken()).toEqual(null);
  });

  it ('should retrieve data from local storage on init', function() {

    window.localStorage.getItem = function(item) {
      if (item === 'cg-auth-token') {
        return dd.token;
      }

      if (item === 'cg-current-user') {
        return JSON.stringify(dd.user);
      }

      if (item === 'cg-auth-exp') {
        return dd.exp + 10000;
      }

      return true;
    };

    LoginStore.init();

    expect(LoginStore.getCurrentUser()).toEqual(dd.user);
    expect(LoginStore.getAuthToken()).toEqual(dd.token);

  });

  it ('should recognize an expired token on init', function() {

    //reset the login store by logging out the user
    //verify the reset
    //set the mocked local storage to return an expired token

    AppDispatcher.handleServerAction({
      actionType: constants.LOGOUT_USER
    });

    expect(LoginStore.getCurrentUser()).toEqual(null);
    expect(LoginStore.getAuthToken()).toEqual(null);

    window.localStorage.getItem = function(item) {
      if (item === 'cg-auth-token') {
        return dd.token;
      }

      if (item === 'cg-current-user') {
        return JSON.stringify(dd.user);
      }

      if (item === 'cg-auth-exp') {
        return dd.exp - 10000;
      }

      return true;
    };

    LoginStore.init();

    expect(LoginStore.getCurrentUser()).toEqual(null);
    expect(LoginStore.getAuthToken()).toEqual(null);

  });


});
