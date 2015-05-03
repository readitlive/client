var LoginStore = require('../stores/LoginStore');

module.exports = function(requestType, requestURL, data, callback) {
  var request, token;
  request = new XMLHttpRequest();
  request.open(requestType, 'http://localhost:3000/api/' + requestURL, true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  token = LoginStore.getAuthToken();
  if (token) {
    request.setRequestHeader('access-token', token);
  }
  request.send(JSON.stringify(data));
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data;
      try {
        data = JSON.parse(request.responseText);
      } catch (e) {
        data = {};
      }
      return callback(null, data);
    } else {
      return callback(request.status, request);
    }
  };
  request.onerror = function(err) {
    return callback(err, request);
  };
};
