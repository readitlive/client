var React = require('react');
var R = require('ramda');

var LoginStore = require('../stores/LoginStore');

var TopBar = require('./TopBar');
var NewPost = require('./NewPost');
var Feed = require('./Feed');

require('./__styles__/App.styl');

var WriteApp = React.createClass({

  getInitialState: function () {
    return {
      user: dummyUser,
      header: dummyHeader
    };
  },

  render: function() {
    var isAuthenticated = function() {
      if (this.state.user) {
        return <NewPost />;
      }
    }.bind(this);

    return (
      <div>
        <TopBar navbarData={this.state.header} user={this.state.user} />
        {isAuthenticated()}
        <Feed />
      </div>
    );
  }
});

var dummyUser = {
  username: 'bob',
  eventAdmin: true,
  avatarUrl: 'http://liveblogphotos.s3-us-west-2.amazonaws.com/c1b8987d-9a4a-4f32-b8db-86e5e3e1a662.jpeg'
};

var dummyHeader = {headerData: { brand: 'Live Update Guy', currentEvent: 'Vuelta a España 2014: Stage 4: Mairena del Alcor to Córdoba, 164.7km'}, isLive: 'true' };

module.exports = WriteApp;
