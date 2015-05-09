var SockJS = require('sockjs-client');
var sock;

var WSHelper = {
  connect(eventId, callback) {
    sock = new SockJS('http://104.236.225.58:3080/ws');
    sock.onmessage = function(e) {
        callback(JSON.parse(e.data));
    };

    sock.onerror = function(err) {
      console.log('socket error: ', err);
    };
    sock.onopen = function() {
      sock.send(JSON.stringify({eventId: eventId}));
    }
  },

  send(post) {
    sock.send(JSON.stringify(post));
  }
};

module.exports = WSHelper;
