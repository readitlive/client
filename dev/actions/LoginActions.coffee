constants = require('../constants/constants')
AppDispatcher = require('../dispatchers/appDispatcher')
ApiHelper = require('../helpers/ApiHelper')



LoginActionsCreators = {

  # user actions
  loginUser: (username, password) ->

    # this is called when submitting the login form
    # this just assembles the payload and sends it to the API
    data = {
      username: username
      password: password
    }
    ApiHelper('POST', '/auth', data, LoginActionsCreators.receiveUserLogin)

  signupUser: (username, password) ->

    data = {
      username: username
      password: password
    }
    ApiHelper('POST', '/signup', data, LoginActionsCreators.receiveUserLogin)

  logoutUser: ->
    AppDispatcher.handleServerAction({
      actionType: constants.LOGOUT_USER
      })


  # server actions
  receiveUserLogin: (error, data) ->

    if (error)
      #TODO: handle error
    else
      AppDispatcher.handleServerAction({
        actionType: constants.RECEIVE_LOGIN_USER
        user: data.user
        token: data.token
        exp: data.exp
        })

};

module.exports = LoginActionsCreators;
