merge = require('react/lib/merge')
EventEmitter = require('events').EventEmitter
AppDispatcher = require('../dispatchers/appDispatcher')
constants = require('../constants/constants')

CHANGE_EVENT = 'change'

_currentUser = null
_authToken = null
_exp = null


# user info is saved in local storage
# and route is set to /home
_loginUser = (userData, authToken, exp) ->
  _currentUser = userData
  _authToken = authToken
  _exp = exp
  window.localStorage.setItem('cg-auth-token', authToken)
  window.localStorage.setItem('cg-current-user', JSON.stringify(userData))
  window.localStorage.setItem('cg-auth-exp', exp)
  window.fd_router.setRoute('/home')


# user info removed from local storage and user is taken to the login page
_logoutUser = ->
  _currentUser = null
  _authToken = null
  _exp = null
  window.localStorage.removeItem('cg-auth-token')
  window.localStorage.removeItem('cg-current-user')
  window.localStorage.removeItem('cg-auth-exp')
  window.fd_router.setRoute('/login')




LoginStore = merge(EventEmitter.prototype, {
    # this is called when the app starts up (in main) and checks whether the user is logged in (keys in local storage)
    init: ->
      authToken = window.localStorage.getItem('cg-auth-token')
      userData = JSON.parse(window.localStorage.getItem('cg-current-user'))
      exp = window.localStorage.getItem('cg-auth-exp')
      # if the token has expired, return, since the user will need to login again
      if exp and exp <= Date.now()
        return
      if authToken and userData
        _currentUser = userData
        _authToken = authToken
        _exp = exp

    emitChange: ->
      @emit CHANGE_EVENT

    addChangeListener: (callback) ->
      @on(CHANGE_EVENT, callback)

    removeChangeListener: (callback) ->
      @removeListener CHANGE_EVENT, callback

    getCurrentUser: ->
      _currentUser

    getAuthToken: ->
      _authToken

})

LoginStore.dispatcherToken = AppDispatcher.register (payload) ->
  action = payload.action # this is the action from handleViewAction
  switch action.actionType
    when constants.RECEIVE_LOGIN_USER
      _loginUser action.user, action.token, action.exp
      LoginStore.emitChange()
      break

    when constants.LOGOUT_USER
      _logoutUser()
      LoginStore.emitChange()
      break



  true # needed for promises to resolve



module.exports = LoginStore
