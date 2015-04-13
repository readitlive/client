var React = require('react');
var R = require('ramda');

// var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');
var Post = require('./Post');

var Feed = React.createClass({

  getInitialState: function () {
    return {
      postsData: PostsStore.getPosts()
    };
  },

  componentDidMount: function() {
    PostsStore.addChangeListener(this._onPostsChange);
  },

  componentWillUnmount: function() {
    PostsStore.removeChangeListener(this._onPostsChange);
  },

  _onPostsChange() {
    this.setState({postsData: PostsStore.getPosts()});
  },

  render: function() {
    var postNodes;
    if (this.state.postsData) {
      postNodes = R.map((post, i) => {
        return (
          <Post post={post} key={i}/>
        );
      }, this.state.postsData);
    }

    return (
      <div className="container">
        {postNodes}
      </div>
    );
  }
});

module.exports = Feed;
