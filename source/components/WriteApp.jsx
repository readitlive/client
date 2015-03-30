var React = require('react');
var R = require('ramda');

var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');

var TopBar = require('./TopBar');
var NewPost = require('./NewPost');
var Post = require('./Post');

require('./__styles__/App.styl');

var WriteApp = React.createClass({

  getInitialState: function () {
    return {
      user: dummyUser,
      postData: PostsStore.getPosts(),
      header: dummyHeader
    };
  },

  componentDidMount: function() {
    PostsStore.addChangeListener(this._onPostsChange);
  },

  componentWillUnmount: function() {
    PostsStore.removeChangeListener(this._onPostsChange);
  },

  _onPostsChange() {
    this.setState({postData: PostsStore.getPosts()});
  },

  render: function() {
    var postNodes;
    if (this.state.postData) {
      postNodes = R.map((post, i) => {
        return (
          <div>
            <Post metaData={post.metaData} text={post.text} key={i}/>
          </div>
        );
      }, this.state.postData);
    }

    var isAuthenticated = function() {
      if (this.state.user) {
        return <NewPost />;
      }
    }.bind(this);

    return (
      <div>
        <TopBar navbarData={this.state.header} user={this.state.user} />
        {isAuthenticated()}
        {postNodes}
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
