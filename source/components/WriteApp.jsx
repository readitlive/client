var React = require('react');
var R = require('ramda');

// var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');
var EventStore = require('../stores/EventStore');

var TopBar = require('./TopBar');
var NewPost = require('./NewPost');
var Feed = require('./Feed');

require('./__styles__/App.styl');

var WriteApp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState() {
    return {
      user: dummyUser,
      header: dummyHeader
    };
  },

  componentWillMount() {
    var eventId = this.context.router.getCurrentParams().eventId;
    this.setState({eventId});
    EventStore.init(eventId);
    PostsStore.init(eventId);
  },

  componentDidMount() {
    EventStore.addChangeListener(this.handleChange);
  },

  componentDidUpdate() {
    var eventId = this.context.router.getCurrentParams().eventId;
    if (eventId !== this.state.eventId) {
      this.setState({eventId});
      EventStore.init(eventId);
      PostsStore.init(eventId);
    }
  },

  componentWillUnmount() {
    EventStore.removeChangeListener(this.handleChange);
  },

  handleChange() {
    this.setState({event: EventStore.getEvent()});
  },

  render() {
    var isAuthenticated = function() {
      if (this.state.user) {
        return <NewPost />;
      }
    }.bind(this);

    return (
      <div>
        <TopBar event={this.state.event} user={this.state.user} />
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
