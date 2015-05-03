var React = require('react');
var R = require('ramda');

// var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');
var EventStore = require('../stores/EventStore');
var LoginStore = require('../stores/LoginStore');

var SocketActions = require('../actions/SocketActions');
var WSHelper = require('../helpers/WSHelper');

var TopBar = require('./TopBar');
var NewPost = require('./NewPost');
var Feed = require('./Feed');

require('./__styles__/App.styl');

var WriteApp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  statics: {
    getStateFromStores() {
      return {
        event: EventStore.getEvent(),
        user: LoginStore.getCurrentUser(),
        isAdmin: LoginStore.userIsAdmin(EventStore.getEvent())
      };
    }
  },

  getInitialState() {
    return WriteApp.getStateFromStores();
  },

  componentWillMount() {
    var eventId = this.context.router.getCurrentParams().eventId;
    this.setState({eventId});
    EventStore.init(eventId);
    PostsStore.init(eventId);
    WSHelper.connect(eventId, SocketActions.receiveUpdate);
  },

  componentDidMount() {
    EventStore.addChangeListener(this.handleStoreChange);
    LoginStore.addChangeListener(this.handleStoreChange);
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
    EventStore.removeChangeListener(this.handleStoreChange);
    LoginStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(WriteApp.getStateFromStores());
  },

  render() {
    var isAdmin = LoginStore.userIsAdmin(this.state.event);

    return (
      <div>
        <TopBar event={this.state.event} user={this.state.user} />
        {isAdmin && <NewPost />}
        <Feed isAdmin={this.state.isAdmin}/>
      </div>
    );
  }
});

module.exports = WriteApp;
