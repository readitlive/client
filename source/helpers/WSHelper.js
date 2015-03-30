var SockJS = require('sockjs-client');
var sock;

var WSHelper = {
  connect: function(callback) {
    sock = new SockJS('http://localhost:3080/ws');
    sock.onopen = function() {
        console.log('open');
    };
    sock.onmessage = function(e) {
        callback(JSON.parse(e.data));
    };
    sock.onclose = function() {
        console.log('close');
    };

    sock.onerror = function(err) {
      console.log('socket error: ', err);
    };
    //
    // sock.send('test');
    // sock.close();
  }
};

module.exports = WSHelper;
