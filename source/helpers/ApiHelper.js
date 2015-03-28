var LoginStore = require('../stores/LoginStore');

module.exports = function(requestType, requestURL, data, callback) {
  var request, token;
  request = new XMLHttpRequest();
  request.open(requestType, 'http://localhost:5000' + requestURL, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  token = LoginStore.getAuthToken();
  if (token) {
    request.setRequestHeader('auth-token', token);
  }
  request.send(JSON.stringify(data));
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      return callback(null, JSON.parse(request.responseText));
    } else {
      return callback(request.status, request);
    }
  };
  return request.onerror = function(err) {
    return callback(err, request);
  };
};
