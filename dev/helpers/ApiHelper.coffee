
# generic helper function to make the XMLHttpRequest

LoginStore = require('../stores/LoginStore')

module.exports = (requestType, requestURL, data, callback) ->

    request = new XMLHttpRequest()

    #TODO: attach JWT Auth token to request
    #Should be avaliable from local storage

#choose the appropriate API endpoint:
#when running the app server locally using nodemon:
    request.open(requestType, 'http://localhost:5000' + requestURL, true)

#app server is in a docker container
#    request.open(requestType, 'http://localhost:50009' + requestURL, true)

#azure:
    #request.open(requestType, 'http://staging-roger.cloudapp.net:50099' + requestURL, true)


    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')

    # if the user is logged in, add the user's JWT token to the request headers
    token = LoginStore.getAuthToken()
    if token
      request.setRequestHeader('auth-token', token)

    request.send(JSON.stringify(data))

    request.onload = ->
      if request.status >= 200 and request.status < 400
        # success!
        # callback takes error, data
        callback null, JSON.parse(request.responseText)
      else
        #TODO: get error out of request

        callback request.status, request

    request.onerror = (err)->
      #There was a connection error of some sort
      callback err, request


