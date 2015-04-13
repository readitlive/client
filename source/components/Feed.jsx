var React = require('react');
var R = require('ramda');

// var LoginStore = require('../stores/LoginStore');
var PostsStore = require('../stores/PostsStore');
var Post = require('./Post');

var Feed = React.createClass({

  getInitialState() {
    return {
      postsData: PostsStore.getPosts()
    };
  },

  componentDidMount() {
    PostsStore.addChangeListener(this._onPostsChange);
  },

  componentWillUnmount() {
    PostsStore.removeChangeListener(this._onPostsChange);
  },

  _onPostsChange() {
    this.setState({postsData: PostsStore.getPosts()});
  },

  render() {
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
