var socket;

var WSHelper = {
  connect: function(callback) {
    socket = new WebSocket('ws://localhost:3000/posts');
    socket.onopen = function () {
       console.log('socket connected');
    };
    socket.onmessage = function (event) {
       callback(event);
    };
    socket.onclose = function () {
      console.log('disconnected socket');
    };
  }
};

module.exports = WSHelper;
