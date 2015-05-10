var React = require('react');
var R = require('ramda');

// var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');
var EventStore = require('../stores/EventStore');
var LoginStore = require('../stores/LoginStore');

var CommentsActions = require('../actions/CommentsActions');
var PostsActions = require('../actions/PostsActions');
var SocketActions = require('../actions/SocketActions');
var WSHelper = require('../helpers/WSHelper');

var TopBar = require('./TopBar');
var NewPost = require('./NewPost');
var Feed = require('./Feed');
var CommentsDisplay = require('./CommentsDisplay');

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
        isAdmin: LoginStore.userIsAdmin(EventStore.getEvent()),
        postsData: PostsStore.getPosts()
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
    PostsStore.addChangeListener(this.handleStoreChange);
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState.event._id !== this.state.event._id) {
      window.document.title = nextState.event.eventTitle;
    }

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
    PostsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange() {
    this.setState(WriteApp.getStateFromStores());
  },

  render() {
    var isAdmin = LoginStore.userIsAdmin(this.state.event);

    return (
      <div>
        <TopBar event={this.state.event} user={this.state.user} isAdmin={this.state.isAdmin}/>
        {this.state.user &&
          <NewPost
            imageUpload={isAdmin}
            submitAction={isAdmin ? PostsActions.submit : CommentsActions.submit}
            customAction={isAdmin ? {label: "<Embed>", action: (postText) => PostsActions.submit(postText, true)} : {}}/>
        }
        <div className="flex-box">
          <Feed isAdmin={this.state.isAdmin} postsData={this.state.postsData}/>
          {isAdmin && <CommentsDisplay />}
        </div>
      </div>
    );
  }
});

module.exports = WriteApp;
