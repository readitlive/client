var React = require('react');
var R = require('ramda');

var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');
var Post = require('./Post');

var Feed = React.createClass({

  getInitialState: function () {
    return {
      postData: PostsStore.getPosts()
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
          <Post metaData={post.metaData} text={post.text} key={i}/>
        );
      }, this.state.postData);
    }

    return (
      <div className="container">
        {postNodes}
      </div>
    );
  }
});

module.exports = Feed;
